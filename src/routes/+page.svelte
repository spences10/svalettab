<script lang="ts">
	import { get_contrast_color } from '$lib/contrast';
	import {
		get_fontsource_url,
		get_random_fonts,
		type Font,
	} from '$lib/fonts';
	import { get_random_palette, type Palette } from '$lib/palettes';

	let palette = $state<Palette>(get_random_palette());
	let fonts = $state<Font[]>(get_random_fonts(5));
	let toast = $state({ message: '', visible: false });
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

<main
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4 md:p-8"
>
	<div
		class="flex flex-wrap items-center justify-center gap-4 md:gap-6"
	>
		{#each palette.colors as color, i}
			{@const font = fonts[i]}
			{@const text_color = get_contrast_color(color)}

			<div
				class="group relative h-[380px] w-[220px] cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl md:h-[430px] md:w-[250px]"
			>
				<!-- Color section (top) -->
				<button
					class="relative flex h-[65%] w-full flex-col items-center justify-center overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-inset"
					style="background-color: {color};"
					onclick={() => copy_hex(color)}
					aria-label="Copy {color} to clipboard"
				>
					<!-- Font sample text -->
					<span
						class="text-6xl font-bold opacity-90 md:text-7xl"
						style="font-family: {font.family}; color: {text_color};"
					>
						Aa
					</span>
					<span
						class="mt-2 text-2xl opacity-70 md:text-3xl"
						style="font-family: {font.family}; color: {text_color};"
					>
						Bb Cc
					</span>

					<!-- Hex overlay on hover -->
					<div
						class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100"
					>
						<span
							class="rounded bg-black/50 px-3 py-1 font-mono text-sm tracking-wider text-white uppercase"
						>
							{color}
						</span>
					</div>

					<!-- Curved dip divider -->
					<svg
						class="absolute -bottom-px left-0 w-full"
						viewBox="0 0 250 20"
						preserveAspectRatio="none"
					>
						<path
							d="M0,20 L0,0 Q125,40 250,0 L250,20 Z"
							fill="white"
						/>
					</svg>
				</button>

				<!-- Info section (bottom) -->
				<button
					class="flex h-[35%] w-full flex-col items-center justify-center px-4 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-inset"
					onclick={() => open_fontsource(font)}
					aria-label="Open {font.name} on Fontsource"
				>
					<span
						class="text-lg font-semibold text-slate-800 transition-colors group-hover:text-slate-600 md:text-xl"
						style="font-family: {font.family};"
					>
						{font.name}
					</span>
					<span
						class="mt-1 text-xs tracking-wider text-slate-400 uppercase"
					>
						{font.category}
					</span>
				</button>
			</div>
		{/each}
	</div>
</main>

<!-- Refresh button -->
<button
	class="fixed right-4 bottom-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-600 shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 md:right-6 md:bottom-6"
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
		class="fixed top-4 left-1/2 -translate-x-1/2 rounded-lg bg-slate-800 px-4 py-2 font-mono text-sm text-white shadow-lg"
		role="status"
		aria-live="polite"
	>
		{toast.message}
	</div>
{/if}
