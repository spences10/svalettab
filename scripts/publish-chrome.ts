#!/usr/bin/env -S node --experimental-strip-types
/**
 * Publish extension to Chrome Web Store using the API directly
 * https://developer.chrome.com/docs/webstore/using-api
 */

import { readFileSync } from 'node:fs';

const extension_id = process.env.CHROME_EXTENSION_ID;
const client_id = process.env.CHROME_CLIENT_ID;
const client_secret = process.env.CHROME_CLIENT_SECRET;
const refresh_token = process.env.CHROME_REFRESH_TOKEN;
const zip_path =
	process.env.ZIP_PATH ?? 'dist-extension/svalettab-chrome.zip';

const required_vars = {
	CHROME_EXTENSION_ID: extension_id,
	CHROME_CLIENT_ID: client_id,
	CHROME_CLIENT_SECRET: client_secret,
	CHROME_REFRESH_TOKEN: refresh_token,
};

for (const [key, value] of Object.entries(required_vars)) {
	if (!value) {
		console.error(`Missing required env var: ${key}`);
		process.exit(1);
	}
}

async function get_access_token(): Promise<string> {
	console.log('Refreshing access token...');

	const response = await fetch(
		'https://oauth2.googleapis.com/token',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				client_id: client_id!,
				client_secret: client_secret!,
				refresh_token: refresh_token!,
				grant_type: 'refresh_token',
			}),
		},
	);

	if (!response.ok) {
		const text = await response.text();
		throw new Error(
			`Token refresh failed: ${response.status} ${text}`,
		);
	}

	const data = (await response.json()) as { access_token: string };
	return data.access_token;
}

async function upload_extension(access_token: string): Promise<void> {
	console.log(`Uploading ${zip_path}...`);

	const zip_buffer = readFileSync(zip_path);

	const response = await fetch(
		`https://www.googleapis.com/upload/chromewebstore/v1.1/items/${extension_id}`,
		{
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${access_token}`,
				'x-goog-api-version': '2',
			},
			body: zip_buffer,
		},
	);

	const data = (await response.json()) as {
		uploadState: string;
		itemError?: Array<{ error_detail: string }>;
	};

	if (data.uploadState === 'FAILURE') {
		console.error('Upload failed:', JSON.stringify(data, null, 2));
		process.exit(1);
	}

	console.log('Upload successful:', data.uploadState);
}

async function publish_extension(
	access_token: string,
): Promise<void> {
	console.log('Publishing...');

	const response = await fetch(
		`https://www.googleapis.com/chromewebstore/v1.1/items/${extension_id}/publish`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${access_token}`,
				'x-goog-api-version': '2',
				'Content-Length': '0',
			},
		},
	);

	const data = (await response.json()) as {
		status: string[];
		statusDetail?: string[];
	};

	if (data.status?.[0] !== 'OK') {
		console.error('Publish failed:', JSON.stringify(data, null, 2));
		process.exit(1);
	}

	console.log('Published successfully:', data.status);
}

async function main(): Promise<void> {
	try {
		const access_token = await get_access_token();
		await upload_extension(access_token);
		await publish_extension(access_token);
		console.log('Done!');
	} catch (error) {
		console.error('Error:', (error as Error).message);
		process.exit(1);
	}
}

main();
