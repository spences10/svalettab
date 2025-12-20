<script lang="ts">
	import {
		get_contrast_color,
		get_secondary_contrast_color,
	} from '$lib/contrast';
	import {
		get_fontsource_url,
		get_random_fonts,
		type Font,
	} from '$lib/fonts';
	import { get_random_palette, type Palette } from '$lib/palettes';

	let palette = $state<Palette>(get_random_palette());
	let fonts = $state<Font[]>(get_random_fonts(5));
	let toast = $state<{ message: string; visible: boolean }>({
		message: '',
		visible: false,
	});
	let toast_timeout: ReturnType<typeof setTimeout> | null = null;

	function refresh() {
		palette = get_random_palette();
		fonts = get_random_fonts(5);
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

	function open_fontsource(font: Font) {
		window.open(
			get_fontsource_url(font),
			'_blank',
			'noopener,noreferrer',
		);
	}

	function handle_keydown(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'r' || e.key === 'R') {
			// Don't trigger if user is typing in an input
			if (
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			)
				return;
			e.preventDefault();
			refresh();
		}
	}
</script>

<svelte:window onkeydown={handle_keydown} />

<main class="flex h-screen w-screen flex-col md:flex-row">
	{#each palette.colors as color, i}
		{@const font = fonts[i]}
		{@const text_color = get_contrast_color(color)}
		{@const secondary_color = get_secondary_contrast_color(color)}

		<div
			class="group relative flex flex-1 flex-col items-center justify-end pb-8 transition-all duration-200 hover:flex-[1.1] md:pb-16"
			style="background-color: {color};"
		>
			<!-- Color swatch click area -->
			<button
				class="absolute inset-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-inset"
				onclick={() => copy_hex(color)}
				aria-label="Copy {color} to clipboard"
			>
				<span class="sr-only">Copy {color}</span>
			</button>

			<!-- Content -->
			<div class="pointer-events-none relative z-10 text-center">
				<!-- Hex code -->
				<p
					class="mb-2 font-mono text-sm tracking-wider uppercase opacity-70 transition-opacity group-hover:opacity-100"
					style="color: {secondary_color};"
				>
					{color}
				</p>

				<!-- Font name -->
				<button
					class="pointer-events-auto cursor-pointer text-2xl font-medium transition-all hover:scale-105 focus:outline-none focus-visible:underline md:text-3xl lg:text-4xl"
					style="font-family: {font.family}; color: {text_color};"
					onclick={() => open_fontsource(font)}
					aria-label="Open {font.name} on Fontsource"
				>
					{font.name}
				</button>
			</div>

			<!-- Subtle border between swatches -->
			{#if i < palette.colors.length - 1}
				<div
					class="absolute top-0 right-0 bottom-0 hidden w-px md:block"
					style="background-color: {secondary_color}; opacity: 0.2;"
				></div>
				<div
					class="absolute right-0 bottom-0 left-0 h-px md:hidden"
					style="background-color: {secondary_color}; opacity: 0.2;"
				></div>
			{/if}
		</div>
	{/each}
</main>

<!-- Refresh button -->
<button
	class="fixed right-4 bottom-4 flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 md:right-6 md:bottom-6"
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
	>
		<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
		<path d="M21 3v5h-5" />
	</svg>
</button>

<!-- Toast notification -->
{#if toast.visible}
	<div
		class="fixed top-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/80 px-4 py-2 font-mono text-sm text-white backdrop-blur-sm transition-all"
		role="status"
		aria-live="polite"
	>
		{toast.message}
	</div>
{/if}
