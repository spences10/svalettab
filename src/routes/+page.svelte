<script lang="ts">
	import FlipCard from '$lib/components/flip-card.svelte';
	import { get_random_fonts, type Font } from '$lib/fonts';
	import { get_random_palette, type Palette } from '$lib/palettes';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let palette = $state<Palette>(get_random_palette());
	let fonts = $state<Font[]>(get_random_fonts(5));
	let generation = $state(0);
	let flipped = $state(false);
	let toast = $state({ message: '', visible: false });
	let toast_timeout: ReturnType<typeof setTimeout> | null = null;
	let refreshing = $state(false);

	function refresh() {
		if (refreshing) return;
		refreshing = true;

		// Flip the cards
		flipped = !flipped;
		generation++;

		// Update data after a short delay (while cards are mid-flip)
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
	<div class="cards-wrapper">
		{#each palette.colors as color, i (i)}
			<FlipCard
				{color}
				font={fonts[i]}
				index={i}
				{generation}
				{flipped}
				on_copy_hex={copy_hex}
			/>
		{/each}
	</div>
</main>

<!-- Palette info bar -->
<div class="info-bar">
	{#key generation}
		<div
			class="color-swatches"
			in:fly={{ y: 20, duration: 300, easing: backOut }}
		>
			{#each palette.colors as color}
				<div class="swatch" style="background-color: {color};"></div>
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
				in:fly={{ y: 20, duration: 300, delay: 100, easing: backOut }}
			>
				by {palette.author}
			</p>
		{/if}
	{/key}
</div>

<!-- Refresh button -->
<button
	class="refresh-btn"
	class:spinning={refreshing}
	onclick={refresh}
	aria-label="Generate new palette (press Space or R)"
	title="Generate new palette (Space or R)"
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
		background: linear-gradient(to bottom right, #f1f5f9, #e2e8f0);
		padding: 1rem;
		padding-bottom: 8rem;
	}

	@media (min-width: 768px) {
		.main-container {
			padding: 2rem;
			padding-bottom: 10rem;
		}
	}

	.cards-wrapper {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		perspective: 1800px;
	}

	@media (min-width: 768px) {
		.cards-wrapper {
			gap: 1.5rem;
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
		padding: 1rem;
		background-color: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(8px);
	}

	.color-swatches {
		display: flex;
		gap: 2px;
		overflow: hidden;
		border-radius: 0.25rem;
		margin-bottom: 0.5rem;
	}

	.swatch {
		width: 2rem;
		height: 0.75rem;
	}

	.palette-name {
		font-size: 1.125rem;
		font-weight: 600;
		color: rgb(51 65 85);
	}

	.palette-author {
		font-size: 0.875rem;
		color: rgb(148 163 184);
	}

	/* Refresh button */
	.refresh-btn {
		position: fixed;
		right: 1rem;
		bottom: 5rem;
		display: flex;
		height: 3rem;
		width: 3rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		border: none;
		background-color: white;
		color: rgb(71 85 105);
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
		cursor: pointer;
		transition: all 300ms ease;
	}

	@media (min-width: 768px) {
		.refresh-btn {
			right: 1.5rem;
			bottom: 6rem;
		}
	}

	.refresh-btn:hover {
		transform: scale(1.1);
		box-shadow:
			0 20px 25px -5px rgb(0 0 0 / 0.1),
			0 8px 10px -6px rgb(0 0 0 / 0.1);
	}

	.refresh-btn:focus-visible {
		outline: 2px solid rgb(203 213 225);
		outline-offset: 2px;
	}

	.refresh-icon {
		transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
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
