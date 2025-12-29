#!/usr/bin/env node
import archiver from 'archiver';
import {
	cpSync,
	existsSync,
	mkdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'fs';
import { execSync } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const BUILD_DIR = join(ROOT, 'build');
const DIST_DIR = join(ROOT, 'dist-extension');

/**
 * Extract inline scripts from HTML and save to external file
 * Required for MV3 CSP compliance
 */
function extractInlineScripts(htmlPath, scriptPath) {
	let html = readFileSync(htmlPath, 'utf8');

	// Find inline script in body (SvelteKit hydration script)
	const scriptRegex =
		/<script>\s*\{[\s\S]*?__sveltekit[\s\S]*?\}\s*<\/script>/;
	const match = html.match(scriptRegex);

	if (match) {
		// Extract script content (remove <script> tags)
		let scriptContent = match[0]
			.replace(/^<script>\s*/, '')
			.replace(/\s*<\/script>$/, '');

		// Write to external file
		writeFileSync(scriptPath, scriptContent);

		// Replace inline script with external reference
		html = html.replace(
			match[0],
			'<script src="/sveltekit-init.js"></script>',
		);
		writeFileSync(htmlPath, html);

		console.log('  Extracted inline script to sveltekit-init.js');
	}
}

async function createZip(sourceDir, outPath) {
	return new Promise((resolve, reject) => {
		const output = createWriteStream(outPath);
		const archive = archiver('zip', { zlib: { level: 9 } });

		output.on('close', resolve);
		archive.on('error', reject);

		archive.pipe(output);
		archive.directory(sourceDir, false);
		archive.finalize();
	});
}

async function build() {
	// Clean
	if (existsSync(DIST_DIR)) {
		rmSync(DIST_DIR, { recursive: true });
	}

	// Run SvelteKit build
	console.log('Building SvelteKit app...');
	execSync('pnpm build', { stdio: 'inherit' });

	// Read version from package.json
	const pkg = JSON.parse(
		readFileSync(join(ROOT, 'package.json'), 'utf8'),
	);
	const version = pkg.version;

	// Update source manifests with version
	for (const browser of ['chrome', 'firefox']) {
		const srcManifestPath = join(
			ROOT,
			'extension',
			browser,
			'manifest.json',
		);
		const manifest = JSON.parse(
			readFileSync(srcManifestPath, 'utf8'),
		);
		manifest.version = version;
		writeFileSync(
			srcManifestPath,
			JSON.stringify(manifest, null, '\t') + '\n',
		);
	}
	console.log(`Updated source manifests to version ${version}`);

	// Build for each browser
	for (const browser of ['chrome', 'firefox']) {
		console.log(`Packaging for ${browser}...`);

		const browserDir = join(DIST_DIR, browser);
		mkdirSync(browserDir, { recursive: true });

		// Copy build output
		cpSync(BUILD_DIR, browserDir, { recursive: true });

		// Extract inline scripts for MV3 CSP compliance
		extractInlineScripts(
			join(browserDir, 'index.html'),
			join(browserDir, 'sveltekit-init.js'),
		);

		// Read and update manifest with version from package.json
		const manifestPath = join(
			ROOT,
			'extension',
			browser,
			'manifest.json',
		);
		const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
		manifest.version = version;

		// Write manifest to output
		const fs = await import('fs');
		fs.writeFileSync(
			join(browserDir, 'manifest.json'),
			JSON.stringify(manifest, null, '\t'),
		);

		// Create zip for distribution
		await createZip(
			browserDir,
			join(DIST_DIR, `svalettab-${browser}.zip`),
		);
		console.log(`Created svalettab-${browser}.zip`);
	}

	console.log('\nDone! Extensions ready in dist-extension/');
}

build().catch(console.error);
