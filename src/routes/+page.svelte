<script lang="ts">
	import FlipCard from '$lib/components/flip-card.svelte';
	import { get_random_fonts, type Font } from '$lib/fonts';
	import { get_random_palette, type Palette } from '$lib/palettes';
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

<!-- Palette info bar -->
<div class="info-bar">
	{#if show_info}
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
	{/if}
</div>

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
		background: #f8f8f8;
		padding: 1rem;
		padding-bottom: 8rem;
		transition: background-color 1s linear;
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
		color: #999;
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

	/* Info bar */
	.info-bar {
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1.25rem;
		background-color: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(8px);
		min-height: 90px;
	}

	.color-swatches {
		display: flex;
		gap: 0;
		overflow: hidden;
		margin-bottom: 0.75rem;
		transition: transform 100ms ease-out;
	}

	.color-swatches:hover {
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
		color: #000;
		text-transform: capitalize;
	}

	.palette-author {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size: 0.8rem;
		font-weight: bold;
		letter-spacing: 0.5px;
		color: #ccc;
		margin-top: 0.25rem;
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
		background-color: white;
		color: #111;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: all 300ms ease;
		z-index: 10;
	}

	.refresh-btn:hover {
		transform: translateX(-50%) scale(1.1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.refresh-btn:focus-visible {
		outline: 2px solid rgb(203 213 225);
		outline-offset: 2px;
	}

	.refresh-icon {
		transition: transform 500ms cubic-bezier(0.85, -0.48, 0.26, 0.67);
	}

	.refresh-btn.spinning .refresh-icon {
		transform: rotate(-180deg);
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
		background-color: rgb(30 41 59);
		font-family: ui-monospace, monospace;
		font-size: 0.875rem;
		color: white;
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
	}
</style>
