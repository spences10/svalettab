<script lang="ts">
	import { browser } from '$app/environment';
	import favicon from '$lib/assets/favicon.svg';
	import { theme_store } from '$lib/stores/theme.svelte';
	import './layout.css';
	// Import all fonts
	import '@fontsource-variable/bitter';
	import '@fontsource-variable/crimson-pro';
	import '@fontsource-variable/dm-sans';
	import '@fontsource-variable/fira-code';
	import '@fontsource-variable/fraunces';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/jetbrains-mono';
	import '@fontsource-variable/josefin-sans';
	import '@fontsource-variable/lora';
	import '@fontsource-variable/manrope';
	import '@fontsource-variable/outfit';
	import '@fontsource-variable/playfair-display';
	import '@fontsource-variable/quicksand';
	import '@fontsource-variable/raleway';
	import '@fontsource-variable/sora';
	import '@fontsource-variable/source-code-pro';
	import '@fontsource-variable/space-grotesk';
	import '@fontsource-variable/work-sans';

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
