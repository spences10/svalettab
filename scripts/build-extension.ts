#!/usr/bin/env -S node --experimental-strip-types
import archiver from 'archiver';
import { execSync } from 'node:child_process';
import {
	cpSync,
	createWriteStream,
	existsSync,
	mkdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const BUILD_DIR = join(ROOT, 'build');
const DIST_DIR = join(ROOT, 'dist-extension');

const BROWSERS = ['chrome', 'firefox'] as const;
type Browser = (typeof BROWSERS)[number];

interface PackageJson {
	version: string;
}

interface Manifest {
	version: string;
	[key: string]: unknown;
}

/**
 * Extract inline scripts from HTML and save to external file
 * Required for MV3 CSP compliance
 */
function extract_inline_scripts(
	html_path: string,
	script_path: string,
): void {
	let html = readFileSync(html_path, 'utf8');

	const script_regex =
		/<script>\s*\{[\s\S]*?__sveltekit[\s\S]*?\}\s*<\/script>/;
	const match = html.match(script_regex);

	if (match) {
		const script_content = match[0]
			.replace(/^<script>\s*/, '')
			.replace(/\s*<\/script>$/, '');

		writeFileSync(script_path, script_content);

		html = html.replace(
			match[0],
			'<script src="/sveltekit-init.js"></script>',
		);
		writeFileSync(html_path, html);

		console.log('  Extracted inline script to sveltekit-init.js');
	}
}

async function create_zip(
	source_dir: string,
	out_path: string,
): Promise<void> {
	return new Promise((resolve, reject) => {
		const output = createWriteStream(out_path);
		const archive = archiver('zip', { zlib: { level: 9 } });

		output.on('close', resolve);
		archive.on('error', reject);

		archive.pipe(output);
		archive.directory(source_dir, false);
		archive.finalize();
	});
}

async function build(): Promise<void> {
	if (existsSync(DIST_DIR)) {
		rmSync(DIST_DIR, { recursive: true });
	}

	console.log('Building SvelteKit app...');
	execSync('pnpm build', { stdio: 'inherit' });

	const pkg = JSON.parse(
		readFileSync(join(ROOT, 'package.json'), 'utf8'),
	) as PackageJson;
	const version = pkg.version;

	for (const browser of BROWSERS) {
		const src_manifest_path = join(
			ROOT,
			'extension',
			browser,
			'manifest.json',
		);
		const manifest = JSON.parse(
			readFileSync(src_manifest_path, 'utf8'),
		) as Manifest;
		manifest.version = version;
		writeFileSync(
			src_manifest_path,
			JSON.stringify(manifest, null, '\t') + '\n',
		);
	}
	console.log(`Updated source manifests to version ${version}`);

	for (const browser of BROWSERS) {
		console.log(`Packaging for ${browser}...`);

		const browser_dir = join(DIST_DIR, browser);
		mkdirSync(browser_dir, { recursive: true });

		cpSync(BUILD_DIR, browser_dir, { recursive: true });

		extract_inline_scripts(
			join(browser_dir, 'index.html'),
			join(browser_dir, 'sveltekit-init.js'),
		);

		const manifest_path = join(
			ROOT,
			'extension',
			browser,
			'manifest.json',
		);
		const manifest = JSON.parse(
			readFileSync(manifest_path, 'utf8'),
		) as Manifest;
		manifest.version = version;

		writeFileSync(
			join(browser_dir, 'manifest.json'),
			JSON.stringify(manifest, null, '\t'),
		);

		await create_zip(
			browser_dir,
			join(DIST_DIR, `svalettab-${browser}.zip`),
		);
		console.log(`Created svalettab-${browser}.zip`);
	}

	console.log('\nDone! Extensions ready in dist-extension/');
}

build().catch(console.error);
