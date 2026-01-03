<script lang="ts">
	import { browser } from '$app/environment';
	import favicon from '$lib/assets/favicon.svg';
	import { theme_store } from '$lib/stores/theme.svelte';
	import './layout.css';
	// ==========================================
	// SANS-SERIF FONTS
	// ==========================================
	import '@fontsource-variable/albert-sans';
	import '@fontsource-variable/archivo';
	import '@fontsource-variable/bricolage-grotesque';
	import '@fontsource-variable/commissioner';
	import '@fontsource-variable/darker-grotesque';
	import '@fontsource-variable/dm-sans';
	import '@fontsource-variable/epilogue';
	import '@fontsource-variable/familjen-grotesk';
	import '@fontsource-variable/figtree';
	import '@fontsource-variable/geist';
	import '@fontsource-variable/hanken-grotesk';
	import '@fontsource-variable/instrument-sans';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/jost';
	import '@fontsource-variable/lexend';
	import '@fontsource-variable/manrope';
	import '@fontsource-variable/outfit';
	import '@fontsource-variable/sora';
	import '@fontsource-variable/space-grotesk';
	import '@fontsource-variable/work-sans';
	// ==========================================
	// SERIF FONTS
	// ==========================================
	import '@fontsource-variable/alegreya';
	import '@fontsource-variable/bitter';
	import '@fontsource-variable/bodoni-moda';
	import '@fontsource-variable/brygada-1918';
	import '@fontsource-variable/cormorant';
	import '@fontsource-variable/crimson-pro';
	import '@fontsource-variable/eb-garamond';
	import '@fontsource-variable/fraunces';
	import '@fontsource-variable/libre-bodoni';
	import '@fontsource-variable/literata';
	import '@fontsource-variable/lora';
	import '@fontsource-variable/playfair-display';
	// ==========================================
	// MONOSPACE FONTS
	// ==========================================
	import '@fontsource-variable/azeret-mono';
	import '@fontsource-variable/fira-code';
	import '@fontsource-variable/geist-mono';
	import '@fontsource-variable/inconsolata';
	import '@fontsource-variable/intel-one-mono';
	import '@fontsource-variable/jetbrains-mono';
	import '@fontsource-variable/kode-mono';
	import '@fontsource-variable/source-code-pro';
	import '@fontsource-variable/victor-mono';
	// ==========================================
	// DISPLAY & EXPERIMENTAL FONTS
	// ==========================================
	import '@fontsource-variable/anybody';
	import '@fontsource-variable/big-shoulders-display';
	import '@fontsource-variable/climate-crisis';
	import '@fontsource-variable/comfortaa';
	import '@fontsource-variable/dynapuff';
	import '@fontsource-variable/foldit';
	import '@fontsource-variable/fredoka';
	import '@fontsource-variable/gabarito';
	import '@fontsource-variable/gluten';
	import '@fontsource-variable/grandstander';
	import '@fontsource-variable/josefin-sans';
	import '@fontsource-variable/kablammo';
	import '@fontsource-variable/quicksand';
	import '@fontsource-variable/raleway';
	import '@fontsource-variable/unbounded';

	let { children } = $props();

	$effect(() => {
		if (browser) {
			document.documentElement.setAttribute(
				'data-theme',
				theme_store.resolved,
			);
		}
	});
</script>

<svelte:head>
	<title>Svalettab</title>
	<meta
		name="description"
		content="Random color palettes with font samples. Get inspired."
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
