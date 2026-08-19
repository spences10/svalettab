#!/usr/bin/env -S node --experimental-strip-types
/// <reference types="node" />
/**
 * Publish an extension with the Chrome Web Store API v2.
 * https://developer.chrome.com/docs/webstore/using-api
 */

import { readFileSync } from 'node:fs';

const extension_id = process.env.CHROME_EXTENSION_ID;
const publisher_id = process.env.CHROME_PUBLISHER_ID;
const client_id = process.env.CHROME_CLIENT_ID;
const client_secret = process.env.CHROME_CLIENT_SECRET;
const refresh_token = process.env.CHROME_REFRESH_TOKEN;
const health_check = process.env.CHROME_HEALTH_CHECK === '1';
const zip_path =
	process.env.ZIP_PATH ?? 'dist-extension/svalettab-chrome.zip';

const required_vars = {
	CHROME_EXTENSION_ID: extension_id,
	CHROME_PUBLISHER_ID: publisher_id,
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

const item_name = `publishers/${publisher_id}/items/${extension_id}`;

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

async function request_web_store(
	url: string,
	access_token: string,
	init: RequestInit = {},
): Promise<unknown> {
	const response = await fetch(url, {
		...init,
		headers: {
			Authorization: `Bearer ${access_token}`,
			...init.headers,
		},
	});
	const text = await response.text();
	const data = text ? (JSON.parse(text) as unknown) : {};

	if (!response.ok) {
		throw new Error(
			`Chrome Web Store API failed: ${response.status} ${text}`,
		);
	}

	return data;
}

async function check_status(access_token: string): Promise<void> {
	console.log('Checking Chrome Web Store API access...');
	await request_web_store(
		`https://chromewebstore.googleapis.com/v2/${item_name}:fetchStatus`,
		access_token,
	);
	console.log('Chrome Web Store API credentials are healthy.');
}

async function upload_extension(access_token: string): Promise<void> {
	console.log(`Uploading ${zip_path}...`);

	const data = (await request_web_store(
		`https://chromewebstore.googleapis.com/upload/v2/${item_name}:upload`,
		access_token,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/zip' },
			body: readFileSync(zip_path),
		},
	)) as { uploadState?: string };

	if (data.uploadState === 'UPLOAD_FAILURE') {
		throw new Error(`Upload failed: ${JSON.stringify(data)}`);
	}

	console.log(
		'Upload accepted:',
		data.uploadState ?? 'unknown state',
	);
}

async function publish_extension(
	access_token: string,
): Promise<void> {
	console.log('Publishing...');

	const data = await request_web_store(
		`https://chromewebstore.googleapis.com/v2/${item_name}:publish`,
		access_token,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({}),
		},
	);

	console.log('Submitted successfully:', JSON.stringify(data));
}

async function main(): Promise<void> {
	try {
		const access_token = await get_access_token();

		if (health_check) {
			await check_status(access_token);
			return;
		}

		await upload_extension(access_token);
		await publish_extension(access_token);
		console.log('Done!');
	} catch (error) {
		console.error('Error:', (error as Error).message);
		process.exit(1);
	}
}

main();
