<script lang="ts">
	import FlipCard from '$lib/components/flip-card.svelte';
	import type { ColorFormat } from '$lib/contrast';
	import { get_random_fonts, type Font } from '$lib/fonts';
	import { get_random_palette, type Palette } from '$lib/palettes';
	import { format_store } from '$lib/stores/format.svelte';
	import { theme_store } from '$lib/stores/theme.svelte';
	import { onMount } from 'svelte';
	import { backOut } from 'svelte/easing';
	import { fade, fly, scale } from 'svelte/transition';

	let palette = $state<Palette>(get_random_palette());
	let fonts = $state<Font[]>(get_random_fonts(5));
	let generation = $state(0);
	let flipped = $state(false);
	let toast = $state({ message: '', visible: false });
	let toast_timeout: ReturnType<typeof setTimeout> | null = null;
	let refreshing = $state(false);

	// Initial load animation states
	let show_cards = $state(false);
	let show_info = $state(false);
	let show_refresh = $state(false);

	// Snake animation for loader
	// Grid: 0,1,2 / 3,4,5 / 6,7,8 → Snake order: 0→1→2→5→8→7→6→3→4
	const SNAKE_ORDER = [0, 1, 2, 5, 8, 7, 6, 3, 4];
	let loader_colors = $state<string[]>([]);

	function init_loader_colors() {
		const c = palette.colors;
		loader_colors = [
			c[0],
			c[1],
			c[2],
			c[3],
			c[4],
			c[3],
			c[2],
			c[1],
			c[0],
		];
	}

	function rotate_loader_colors() {
		loader_colors = [
			loader_colors.at(-1)!,
			...loader_colors.slice(0, -1),
		];
	}

	function get_loader_color(grid_idx: number): string {
		const snake_pos = SNAKE_ORDER.indexOf(grid_idx);
		return loader_colors[snake_pos] ?? palette.colors[0];
	}

	onMount(() => {
		init_loader_colors();
		const loader_interval = setInterval(rotate_loader_colors, 50);

		// Timing
		setTimeout(() => {
			show_cards = true;
			clearInterval(loader_interval);
		}, 1200);

		setTimeout(() => {
			show_info = true;
		}, 1400);

		setTimeout(() => {
			show_refresh = true;
		}, 1700);
	});

	function refresh() {
		if (refreshing) return;
		refreshing = true;

		flipped = !flipped;
		generation++;

		setTimeout(() => {
			palette = get_random_palette();
			fonts = get_random_fonts(5);
			refreshing = false;
		}, 300);
	}

	function show_toast(message: string) {
		if (toast_timeout) clearTimeout(toast_timeout);
		toast = { message, visible: true };
		toast_timeout = setTimeout(() => {
			toast = { message: '', visible: false };
		}, 2000);
	}

	async function copy_hex(hex: string) {
		try {
			await navigator.clipboard.writeText(hex);
			show_toast(`Copied ${hex}`);
		} catch {
			show_toast('Failed to copy');
		}
	}

	function handle_keydown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'r' || event.key === 'R') {
			if (
				event.target instanceof HTMLInputElement ||
				event.target instanceof HTMLTextAreaElement
			)
				return;
			event.preventDefault();
			refresh();
		}
	}
</script>

<svelte:window onkeydown={handle_keydown} />

<main class="main-container">
	<!-- Loading indicator (shows before cards) -->
	{#if !show_cards}
		<div class="loader" out:fade={{ duration: 200 }}>
			<div class="loader-grid">
				{#each { length: 9 } as _, i}
					<div
						class="loader-dot"
						style="background-color: {get_loader_color(i)};"
					></div>
				{/each}
			</div>
			<p class="loader-caption">
				This doesn't need to be here, it loads super fast. Nice
				animation though, right?
			</p>
		</div>
	{/if}

	<!-- Cards -->
	<div class="cards-wrapper">
		{#each palette.colors as color, i (i)}
			<FlipCard
				{color}
				font={fonts[i]}
				index={i}
				{generation}
				{flipped}
				revealed={show_cards}
				on_copy_hex={copy_hex}
			/>
		{/each}
	</div>
</main>

<!-- Palette info - positioned above footer -->
{#if show_info}
	<a
		href={palette.url}
		target="_blank"
		rel="noopener noreferrer"
		class="palette-info"
	>
		{#key generation}
			<div
				class="color-swatches"
				in:fly={{ y: 20, duration: 300, easing: backOut }}
			>
				{#each palette.colors as color}
					<div
						class="swatch"
						style="background-color: {color};"
					></div>
				{/each}
			</div>
			<p
				class="palette-name"
				in:fly={{ y: 20, duration: 300, delay: 50, easing: backOut }}
			>
				{palette.name}
			</p>
			{#if palette.author}
				<p
					class="palette-author"
					in:fly={{
						y: 20,
						duration: 300,
						delay: 100,
						easing: backOut,
					}}
				>
					by {palette.author}
				</p>
			{/if}
		{/key}
	</a>
{/if}

<!-- Footer - slides up on hover -->
<footer>
	<!-- Three dots indicator -->
	<div class="footer-dots">
		<span></span>
		<span></span>
		<span></span>
	</div>
	<div class="footer-content">
		<div class="footer-dip">
			<div class="dip-left"></div>
			<svg class="dip-svg" width="46" height="15" viewBox="0 0 46 15">
				<path
					fill="currentColor"
					fill-rule="evenodd"
					d="M0,0 L0,15 L46,15 L46,0 L0,0 Z M1.229,0 C12.122,0 12.122,12.998 23.016,12.998 C33.909,12.998 33.909,0 44.8,0 C55.691,0 -9.664,0 1.229,0 Z"
				/>
			</svg>
			<div class="dip-right"></div>
		</div>
		<div class="footer-bottom">
			<a
				href="https://github.com/spences10/svalettab"
				target="_blank"
				rel="noopener noreferrer"
				class="logo"
			>
				Svale<span>ttab</span>
			</a>
			<div class="about">
				A Svelte recreation of <a
					href="https://palettab.com"
					target="_blank"
					rel="noopener noreferrer">Palettab</a
				>
				by
				<a
					href="https://twitter.com/twholman"
					target="_blank"
					rel="noopener noreferrer">Tim</a
				>
				&
				<a
					href="https://twitter.com/claudioguglieri"
					target="_blank"
					rel="noopener noreferrer">Claudio</a
				>
			</div>
			<a
				href="https://github.com/spences10/svalettab"
				target="_blank"
				rel="noopener noreferrer"
				class="github-link"
				aria-label="View on GitHub"
			>
				<svg
					viewBox="0 0 24 24"
					width="28"
					height="28"
					fill="currentColor"
				>
					<path
						d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
					/>
				</svg>
			</a>
		</div>
	</div>
</footer>

<!-- Refresh button -->
{#if show_refresh}
	<button
		class="refresh-btn"
		class:spinning={refreshing}
		onclick={refresh}
		aria-label="Generate new palette (press Space or R)"
		title="Generate new palette (Space or R)"
		in:scale={{ duration: 300, start: 0.5, easing: backOut }}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="refresh-icon"
		>
			<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
			<path d="M21 3v5h-5" />
		</svg>
	</button>
{/if}

<!-- Theme toggle -->
{#if show_refresh}
	<button
		class="theme-btn"
		onclick={() => theme_store.cycle()}
		aria-label="Toggle theme (current: {theme_store.current})"
		title="Toggle theme"
		in:scale={{
			duration: 300,
			delay: 100,
			start: 0.5,
			easing: backOut,
		}}
	>
		{#if theme_store.current === 'system'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect x="2" y="3" width="20" height="14" rx="2" />
				<line x1="8" y1="21" x2="16" y2="21" />
				<line x1="12" y1="17" x2="12" y2="21" />
			</svg>
		{:else if theme_store.current === 'light'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="4" />
				<path d="M12 2v2" />
				<path d="M12 20v2" />
				<path d="m4.93 4.93 1.41 1.41" />
				<path d="m17.66 17.66 1.41 1.41" />
				<path d="M2 12h2" />
				<path d="M20 12h2" />
				<path d="m6.34 17.66-1.41 1.41" />
				<path d="m19.07 4.93-1.41 1.41" />
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
			</svg>
		{/if}
	</button>
{/if}

<!-- Format selector -->
{#if show_refresh}
	<select
		class="format-select"
		value={format_store.current}
		onchange={(e) =>
			format_store.set(e.currentTarget.value as ColorFormat)}
		aria-label="Color format"
		in:scale={{
			duration: 300,
			delay: 150,
			start: 0.5,
			easing: backOut,
		}}
	>
		<option value="hex">HEX</option>
		<option value="hsl">HSL</option>
		<option value="oklch">OKLCH</option>
	</select>
{/if}

<!-- Toast notification -->
{#if toast.visible}
	<div
		class="toast"
		role="status"
		aria-live="polite"
		in:fly={{ y: -20, duration: 200 }}
		out:fly={{ y: -20, duration: 150 }}
	>
		{toast.message}
	</div>
{/if}

<style>
	.main-container {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--bg-page);
		padding: 1rem;
		padding-bottom: 8rem;
		transition: background-color 300ms ease;
	}

	@media (min-width: 768px) {
		.main-container {
			padding: 2rem;
			padding-bottom: 10rem;
		}
	}

	/* Loader - like original Palettab */
	.loader {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.loader-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	.loader-dot {
		width: 14px;
		height: 14px;
	}

	.loader-caption {
		margin-top: 2rem;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size: 0.75rem;
		color: var(--text-subtle);
		text-align: center;
	}

	.cards-wrapper {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		perspective: 1800px;
	}

	@media (min-width: 768px) {
		.cards-wrapper {
			gap: 0.75rem;
		}
	}

	@media (min-width: 1024px) {
		.cards-wrapper {
			gap: 1rem;
		}
	}

	/* Palette info - positioned above footer */
	.palette-info {
		position: fixed;
		bottom: 85px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: none;
		text-align: center;
		z-index: 10;
	}

	.color-swatches {
		display: flex;
		gap: 0;
		overflow: hidden;
		margin-bottom: 0.75rem;
		transition: transform 100ms ease-out;
	}

	.palette-info:hover .color-swatches {
		transform: scaleX(1.3);
	}

	.swatch {
		width: 33px;
		height: 5px;
		margin-left: -1px;
	}

	.palette-name {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--text-primary);
		text-transform: capitalize;
	}

	.palette-author {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size: 0.8rem;
		font-weight: bold;
		letter-spacing: 0.5px;
		color: var(--text-faint);
		margin-top: 0.25rem;
	}

	/* Footer - slides up on hover */
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 70px;
		z-index: 50;
		filter: drop-shadow(0 -1px 2px var(--shadow-color));
	}

	.footer-dots {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		gap: 3px;
		z-index: 0;
		transition: opacity 200ms ease;
	}

	.footer-dots span {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--text-faint);
	}

	footer:hover .footer-dots {
		opacity: 0;
	}

	footer:hover .footer-content {
		transform: translateY(0);
	}

	.footer-content {
		transform: translateY(50px);
		transition: transform 200ms ease-out;
		margin: 0 60px;
	}

	.footer-dip {
		display: flex;
		height: 15px;
		overflow: visible;
	}

	.dip-left,
	.dip-right {
		flex: 1;
		background: var(--bg-surface);
		height: 15px;
	}

	.dip-left {
		border-radius: 5px 0 0 0;
	}

	.dip-right {
		border-radius: 0 5px 0 0;
	}

	.footer-dip svg {
		flex-shrink: 0;
		display: block;
		color: var(--bg-surface);
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30px;
		background: var(--bg-surface);
		height: 55px;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}

	.logo {
		font-size: 20px;
		font-weight: bold;
		letter-spacing: 0.8px;
		color: var(--text-primary);
		text-decoration: none;
	}

	.logo span {
		font-weight: normal;
		color: var(--accent-primary);
	}

	.about {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-size: 12px;
		letter-spacing: 0.5px;
		color: var(--text-muted);
	}

	.about a {
		color: var(--accent-secondary);
		text-decoration: none;
	}

	.about a:hover {
		text-decoration: underline;
	}

	.github-link {
		color: var(--accent-primary);
		transition: color 150ms ease;
	}

	.github-link:hover {
		color: var(--text-primary);
	}

	/* Hide footer details on small screens */
	@media (max-width: 900px) {
		.about {
			display: none;
		}

		.footer-content {
			margin: 0 20px;
		}

		.footer-bottom {
			padding: 0 15px;
		}
	}

	/* Refresh button - positioned like original */
	.refresh-btn {
		position: fixed;
		top: 60px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		height: 50px;
		width: 50px;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		border: none;
		background-color: var(--bg-surface);
		color: var(--text-primary);
		box-shadow: 0 2px 4px var(--shadow-color);
		cursor: pointer;
		transition: all 300ms ease;
		z-index: 10;
	}

	.refresh-btn:hover {
		transform: translateX(-50%) scale(1.1);
		box-shadow: 0 4px 12px var(--shadow-strong);
	}

	.refresh-btn:focus-visible {
		outline: 2px solid var(--accent-primary);
		outline-offset: 2px;
	}

	.refresh-icon {
		transition: transform 500ms cubic-bezier(0.85, -0.48, 0.26, 0.67);
	}

	.refresh-btn.spinning .refresh-icon {
		transform: rotate(-180deg);
	}

	/* Theme toggle button - top right */
	.theme-btn {
		position: fixed;
		top: 20px;
		right: 20px;
		display: flex;
		height: 40px;
		width: 40px;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		border: none;
		background-color: var(--bg-surface);
		color: var(--text-primary);
		box-shadow: 0 2px 4px var(--shadow-color);
		cursor: pointer;
		transition: all 200ms ease;
		z-index: 10;
	}

	.theme-btn:hover {
		transform: scale(1.1);
		box-shadow: 0 4px 12px var(--shadow-strong);
	}

	.theme-btn:focus-visible {
		outline: 2px solid var(--accent-primary);
		outline-offset: 2px;
	}

	/* Format selector - top right, below theme toggle */
	.format-select {
		position: fixed;
		top: 70px;
		right: 20px;
		padding: 0.5rem 0.75rem;
		border-radius: 8px;
		border: none;
		background-color: var(--bg-surface);
		color: var(--text-primary);
		font-family: ui-monospace, monospace;
		font-size: 0.75rem;
		font-weight: 600;
		box-shadow: 0 2px 4px var(--shadow-color);
		cursor: pointer;
		transition: all 200ms ease;
		z-index: 10;
		appearance: none;
		padding-right: 1.5rem;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.5rem center;
	}

	.format-select:hover {
		box-shadow: 0 4px 12px var(--shadow-strong);
	}

	.format-select:focus-visible {
		outline: 2px solid var(--accent-primary);
		outline-offset: 2px;
	}

	/* Toast */
	.toast {
		position: fixed;
		top: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 50;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		background-color: var(--bg-toast);
		font-family: ui-monospace, monospace;
		font-size: 0.875rem;
		color: white;
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
	}
</style>
