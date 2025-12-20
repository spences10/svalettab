<script lang="ts">
	import { get_contrast_color } from '$lib/contrast';
	import {
		get_fontsource_url,
		get_random_fonts,
		type Font,
	} from '$lib/fonts';
	import { get_random_palette, type Palette } from '$lib/palettes';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let palette = $state<Palette>(get_random_palette());
	let fonts = $state<Font[]>(get_random_fonts(5));
	let generation = $state(0);
	let toast = $state({ message: '', visible: false });
	let toast_timeout: ReturnType<typeof setTimeout> | null = null;

	function refresh() {
		generation++;
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
	class="flex min-h-svh flex-col items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 px-2 py-4 pb-32 sm:px-4 sm:pb-28 md:p-8 md:pb-32"
>
	<div
		class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-6"
	>
		{#each palette.colors as color, i (`${generation}-${i}`)}
			{@const font = fonts[i]}
			{@const text_color = get_contrast_color(color)}

			<div
				class="group relative h-50 w-27.5 cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:h-70 sm:w-38.75 md:h-107.5 md:w-62.5"
				in:fly={{
					y: 80,
					duration: 400,
					delay: i * 60,
					easing: backOut,
				}}
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
						class="text-3xl font-bold opacity-90 sm:text-5xl md:text-7xl"
						style="font-family: {font.family}; color: {text_color};"
					>
						Ag
					</span>
					<span
						class="mt-1 text-sm opacity-70 sm:mt-2 sm:text-xl md:text-3xl"
						style="font-family: {font.family}; color: {text_color};"
					>
						AaBbCc
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

					<!-- Dimple divider -->
					<svg
						class="absolute -bottom-px left-0 w-full"
						viewBox="0 0 250 12"
						preserveAspectRatio="none"
					>
						<path
							d="M0,12 L0,0 L115,0 Q125,12 135,0 L250,0 L250,12 Z"
							fill="white"
						/>
					</svg>
				</button>

				<!-- Info section (bottom) -->
				<button
					class="flex h-[35%] w-full flex-col items-center justify-center px-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-inset sm:px-3 md:px-4"
					onclick={() => open_fontsource(font)}
					aria-label="Open {font.name} on Fontsource"
				>
					<span
						class="text-xs font-semibold text-slate-800 transition-colors group-hover:text-slate-600 sm:text-sm md:text-xl"
						style="font-family: {font.family};"
					>
						{font.name}
					</span>
					<span
						class="mt-0.5 text-[9px] tracking-wider text-slate-400 uppercase sm:mt-1 sm:text-[11px] md:text-xs"
					>
						{font.category}
					</span>
				</button>
			</div>
		{/each}
	</div>
</main>

<!-- Palette info bar -->
<div
	class="fixed right-0 bottom-0 left-0 flex flex-col items-center justify-center bg-white/80 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm sm:py-4 sm:pb-[calc(1rem+env(safe-area-inset-bottom))]"
>
	{#key generation}
		<div
			class="mb-1.5 flex gap-0.5 overflow-hidden rounded sm:mb-2"
			in:fly={{ y: 20, duration: 300, easing: backOut }}
		>
			{#each palette.colors as color}
				<div
					class="h-2.5 w-6 sm:h-3 sm:w-8"
					style="background-color: {color};"
				></div>
			{/each}
		</div>
		<p
			class="text-sm font-semibold text-slate-700 sm:text-lg"
			in:fly={{ y: 20, duration: 300, delay: 50, easing: backOut }}
		>
			{palette.name}
		</p>
		{#if palette.author}
			<p
				class="text-xs text-slate-400 sm:text-sm"
				in:fly={{ y: 20, duration: 300, delay: 100, easing: backOut }}
			>
				by {palette.author}
			</p>
		{/if}
	{/key}
</div>

<!-- Refresh button -->
<button
	class="fixed right-3 bottom-[calc(5rem+env(safe-area-inset-bottom))] flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 sm:right-4 sm:bottom-[calc(5.5rem+env(safe-area-inset-bottom))] sm:h-12 sm:w-12 md:right-6 md:bottom-[calc(6rem+env(safe-area-inset-bottom))]"
	onclick={refresh}
	aria-label="Generate new palette (press Space or R)"
	title="Generate new palette (Space or R)"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-4 w-4 sm:h-5 sm:w-5"
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
		class="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-slate-800 px-4 py-2 font-mono text-sm text-white shadow-lg"
		role="status"
		aria-live="polite"
		in:fly={{ y: -20, duration: 200 }}
		out:fly={{ y: -20, duration: 150 }}
	>
		{toast.message}
	</div>
{/if}
