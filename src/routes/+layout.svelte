<script lang="ts">
	import './layout.css';

	// Import all fonts
	import '@fontsource-variable/space-grotesk';
	import '@fontsource-variable/outfit';
	import '@fontsource-variable/sora';
	import '@fontsource-variable/work-sans';
	import '@fontsource-variable/dm-sans';
	import '@fontsource-variable/manrope';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/playfair-display';
	import '@fontsource-variable/crimson-pro';
	import '@fontsource-variable/fraunces';
	import '@fontsource-variable/bitter';
	import '@fontsource-variable/lora';
	import '@fontsource-variable/jetbrains-mono';
	import '@fontsource-variable/source-code-pro';
	import '@fontsource-variable/fira-code';
	import '@fontsource-variable/josefin-sans';
	import '@fontsource-variable/raleway';
	import '@fontsource-variable/quicksand';

	let { children } = $props();
</script>

<svelte:head>
	<title>Svalettab</title>
	<meta
		name="description"
		content="Random color palettes with font samples. Get inspired."
	/>
</svelte:head>

{@render children()}
