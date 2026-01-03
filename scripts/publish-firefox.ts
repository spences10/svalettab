#!/usr/bin/env -S node --experimental-strip-types
/**
 * Publish extension to Firefox Add-ons (AMO) using the API directly
 * https://addons-server.readthedocs.io/en/latest/topics/api/addons.html
 */

import { createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';

const jwt_issuer = process.env.FIREFOX_JWT_ISSUER;
const jwt_secret = process.env.FIREFOX_JWT_SECRET;
const addon_guid =
	process.env.FIREFOX_ADDON_GUID ?? 'svalettab@scottspence.com';
const zip_path =
	process.env.ZIP_PATH ?? 'dist-extension/svalettab-firefox.zip';

const required_vars = {
	FIREFOX_JWT_ISSUER: jwt_issuer,
	FIREFOX_JWT_SECRET: jwt_secret,
};

for (const [key, value] of Object.entries(required_vars)) {
	if (!value) {
		console.error(`Missing required env var: ${key}`);
		process.exit(1);
	}
}

const AMO_API = 'https://addons.mozilla.org/api/v5';

function create_jwt(): string {
	const issued_at = Math.floor(Date.now() / 1000);
	const expires_at = issued_at + 300; // 5 minutes

	const header = { alg: 'HS256', typ: 'JWT' };
	const payload = {
		iss: jwt_issuer,
		jti: Math.random().toString(36).substring(2),
		iat: issued_at,
		exp: expires_at,
	};

	const encode_base64url = (obj: object): string =>
		Buffer.from(JSON.stringify(obj))
			.toString('base64')
			.replace(/=/g, '')
			.replace(/\+/g, '-')
			.replace(/\//g, '_');

	const header_b64 = encode_base64url(header);
	const payload_b64 = encode_base64url(payload);
	const signature_input = `${header_b64}.${payload_b64}`;

	const signature = createHmac('sha256', jwt_secret!)
		.update(signature_input)
		.digest('base64')
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');

	return `${signature_input}.${signature}`;
}

async function upload_addon(): Promise<string> {
	console.log(`Uploading ${zip_path}...`);

	const zip_buffer = readFileSync(zip_path);
	const jwt = create_jwt();

	const form_data = new FormData();
	form_data.append('upload', new Blob([zip_buffer]), 'extension.zip');
	form_data.append('channel', 'listed');

	const response = await fetch(`${AMO_API}/addons/upload/`, {
		method: 'POST',
		headers: { Authorization: `JWT ${jwt}` },
		body: form_data,
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`Upload failed: ${response.status} ${text}`);
	}

	const data = (await response.json()) as {
		uuid: string;
		valid: boolean;
	};
	console.log('Upload started, uuid:', data.uuid);
	return data.uuid;
}

async function wait_for_validation(uuid: string): Promise<void> {
	console.log('Waiting for validation...');

	const max_attempts = 30;
	for (let i = 0; i < max_attempts; i++) {
		const jwt = create_jwt();
		const response = await fetch(
			`${AMO_API}/addons/upload/${uuid}/`,
			{
				headers: { Authorization: `JWT ${jwt}` },
			},
		);

		const data = (await response.json()) as {
			valid: boolean;
			processed: boolean;
			validation?: {
				errors: number;
				messages: Array<{ message: string }>;
			};
		};

		if (data.processed) {
			if (data.valid) {
				console.log('Validation passed');
				return;
			} else {
				console.error(
					'Validation failed:',
					JSON.stringify(data.validation, null, 2),
				);
				process.exit(1);
			}
		}

		console.log(`  Attempt ${i + 1}/${max_attempts}, waiting...`);
		await new Promise((r) => setTimeout(r, 5000));
	}

	throw new Error('Validation timed out');
}

async function create_version(uuid: string): Promise<void> {
	console.log('Creating new version...');

	const jwt = create_jwt();

	const response = await fetch(
		`${AMO_API}/addons/addon/${encodeURIComponent(addon_guid)}/versions/`,
		{
			method: 'POST',
			headers: {
				Authorization: `JWT ${jwt}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ upload: uuid }),
		},
	);

	if (!response.ok) {
		const text = await response.text();
		throw new Error(
			`Version creation failed: ${response.status} ${text}`,
		);
	}

	const data = (await response.json()) as {
		version: string;
		id: number;
	};
	console.log('Version created:', data.version);
}

async function main(): Promise<void> {
	try {
		const uuid = await upload_addon();
		await wait_for_validation(uuid);
		await create_version(uuid);
		console.log('Done! Submitted for review.');
	} catch (error) {
		console.error('Error:', (error as Error).message);
		process.exit(1);
	}
}

main();
