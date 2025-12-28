<script lang="ts">
	import { get_contrast_color } from '$lib/contrast';
	import { get_fontsource_url, type Font } from '$lib/fonts';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	interface Props {
		color: string;
		font: Font;
		index: number;
		generation: number;
		flipped: boolean;
		on_copy_hex: (hex: string) => void;
	}

	let {
		color,
		font,
		index,
		generation,
		flipped,
		on_copy_hex,
	}: Props = $props();

	const text_color = $derived(get_contrast_color(color));

	function open_fontsource() {
		window.open(
			get_fontsource_url(font),
			'_blank',
			'noopener,noreferrer',
		);
	}

	// Center-out delay: center card (index 2) = 0ms, adjacent = 80ms, outer = 160ms
	function get_stagger_delay(idx: number): number {
		const center = 2;
		const distance = Math.abs(idx - center);
		return distance * 80;
	}

	// Initial fly-in delay based on position from center
	const fly_delay = $derived(get_stagger_delay(index));
</script>

<div
	class="card-container group"
	style="--index: {index}; perspective: 1200px;"
	in:fly={{
		y: 120,
		duration: 600,
		delay: 400 + fly_delay,
		easing: backOut,
	}}
>
	<div
		class="card-flipper"
		class:flipped
		style="transform-style: preserve-3d; transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1); transition-delay: {get_stagger_delay(
			index,
		)}ms;"
	>
		<!-- Front Face -->
		<div class="card-face card-front">
			<button
				class="color-section"
				style="background-color: {color};"
				onclick={() => on_copy_hex(color)}
				aria-label="Copy {color} to clipboard"
			>
				<span
					class="sample-large"
					style="font-family: {font.family}; color: {text_color};"
				>
					Ag
				</span>
				<span
					class="sample-small"
					style="font-family: {font.family}; color: {text_color};"
				>
					AaBbCc
				</span>

				<!-- Hex overlay on hover -->
				<div class="hex-overlay">
					<span class="hex-value">{color}</span>
				</div>

				<!-- Dimple divider -->
				<svg
					class="dimple"
					viewBox="0 0 250 12"
					preserveAspectRatio="none"
				>
					<path
						d="M0,12 L0,0 L115,0 Q125,12 135,0 L250,0 L250,12 Z"
						fill="white"
					/>
				</svg>
			</button>

			<button
				class="info-section"
				onclick={open_fontsource}
				aria-label="Open {font.name} on Fontsource"
			>
				<span class="font-name" style="font-family: {font.family};">
					{font.name}
				</span>
				<span class="font-category">
					{font.category}
				</span>
			</button>
		</div>

		<!-- Back Face (shown after flip) -->
		<div class="card-face card-back">
			<button
				class="color-section"
				style="background-color: {color};"
				onclick={() => on_copy_hex(color)}
				aria-label="Copy {color} to clipboard"
			>
				<span
					class="sample-large"
					style="font-family: {font.family}; color: {text_color};"
				>
					Ag
				</span>
				<span
					class="sample-small"
					style="font-family: {font.family}; color: {text_color};"
				>
					AaBbCc
				</span>

				<div class="hex-overlay">
					<span class="hex-value">{color}</span>
				</div>

				<svg
					class="dimple"
					viewBox="0 0 250 12"
					preserveAspectRatio="none"
				>
					<path
						d="M0,12 L0,0 L115,0 Q125,12 135,0 L250,0 L250,12 Z"
						fill="white"
					/>
				</svg>
			</button>

			<button
				class="info-section"
				onclick={open_fontsource}
				aria-label="Open {font.name} on Fontsource"
			>
				<span class="font-name" style="font-family: {font.family};">
					{font.name}
				</span>
				<span class="font-category">
					{font.category}
				</span>
			</button>
		</div>
	</div>
</div>

<style>
	.card-container {
		perspective: 1200px;
		width: 180px;
		height: 320px;
	}

	@media (min-width: 768px) {
		.card-container {
			width: 200px;
			height: 360px;
		}
	}

	@media (min-width: 1024px) {
		.card-container {
			width: 220px;
			height: 390px;
		}
	}

	@media (min-width: 1280px) {
		.card-container {
			width: 250px;
			height: 430px;
		}
	}

	.card-flipper {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.card-flipper.flipped {
		transform: rotateY(180deg);
	}

	.card-face {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		border-radius: 0.5rem;
		background: white;
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition:
			transform 300ms ease,
			box-shadow 300ms ease;
	}

	.card-front {
		transform: rotateY(0deg);
	}

	.card-back {
		transform: rotateY(180deg);
	}

	/* 3D hover effect */
	.card-container:hover .card-face {
		box-shadow:
			0 25px 50px -12px rgb(0 0 0 / 0.15),
			0 12px 24px -8px rgb(0 0 0 / 0.1);
	}

	.card-container:hover .card-flipper:not(.flipped) .card-front,
	.card-container:hover .card-flipper.flipped .card-back {
		transform: rotateY(0deg) translateZ(20px) translateY(-8px);
	}

	.card-container:hover .card-flipper:not(.flipped) .card-back {
		transform: rotateY(180deg) translateZ(20px);
	}

	.card-container:hover .card-flipper.flipped .card-front {
		transform: rotateY(180deg) translateZ(20px);
	}

	.color-section {
		position: relative;
		flex: 1 1 65%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border: none;
		outline: none;
		overflow: hidden;
	}

	.color-section:focus-visible {
		outline: 2px solid rgba(255, 255, 255, 0.5);
		outline-offset: -2px;
	}

	.sample-large {
		font-size: 3.75rem;
		font-weight: bold;
		opacity: 0.9;
	}

	@media (min-width: 768px) {
		.sample-large {
			font-size: 4.5rem;
		}
	}

	.sample-small {
		margin-top: 0.5rem;
		font-size: 1.5rem;
		opacity: 0.7;
	}

	@media (min-width: 768px) {
		.sample-small {
			font-size: 1.875rem;
		}
	}

	.hex-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.2);
		opacity: 0;
		transition: opacity 200ms ease;
	}

	.card-container:hover .hex-overlay {
		opacity: 1;
	}

	.hex-value {
		padding: 0.25rem 0.75rem;
		border-radius: 0.25rem;
		background-color: rgba(0, 0, 0, 0.5);
		font-family: ui-monospace, monospace;
		font-size: 0.875rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: white;
	}

	.dimple {
		position: absolute;
		bottom: -1px;
		left: 0;
		width: 100%;
	}

	.info-section {
		flex: 1 1 35%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		text-align: center;
		cursor: pointer;
		border: none;
		background: white;
		width: 100%;
	}

	.info-section:focus-visible {
		outline: 2px solid rgb(203 213 225);
		outline-offset: -2px;
	}

	.font-name {
		font-size: 1.125rem;
		font-weight: 600;
		color: rgb(30 41 59);
		transition: color 200ms ease;
	}

	@media (min-width: 768px) {
		.font-name {
			font-size: 1.25rem;
		}
	}

	.card-container:hover .font-name {
		color: rgb(71 85 105);
	}

	.font-category {
		margin-top: 0.25rem;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: rgb(148 163 184);
	}
</style>
