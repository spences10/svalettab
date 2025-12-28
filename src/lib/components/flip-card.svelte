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

	const fly_delay = $derived(get_stagger_delay(index));
</script>

<div
	class="card-container"
	in:fly={{
		y: 150,
		duration: 600,
		delay: 300 + fly_delay,
		easing: backOut,
	}}
>
	<div
		class="card-flipper"
		class:flipped
		style="transition-delay: {get_stagger_delay(index)}ms;"
	>
		<!-- Front Face -->
		<div class="card-face card-front">
			<div class="card-inner">
				<!-- Color section (top) -->
				<button
					class="color-section"
					style="background-color: {color};"
					onclick={() => on_copy_hex(color)}
					aria-label="Copy {color} to clipboard"
				>
					<!-- Font samples -->
					<div class="font-samples">
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
					</div>

					<!-- Hex overlay -->
					<div class="hex-overlay">
						<span class="hex-value">{color}</span>
					</div>

					<!-- Copy hint -->
					<span class="copy-hint">Click to copy</span>
				</button>

				<!-- Info section (bottom) -->
				<button
					class="info-section"
					onclick={open_fontsource}
					aria-label="Open {font.name} on Fontsource"
				>
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

					<div class="font-details">
						<span
							class="font-name"
							style="font-family: {font.family};"
						>
							{font.name}
						</span>
						<span class="font-category">
							{font.category}
						</span>
					</div>

					<!-- Eye icon (view hint) -->
					<div class="eye-container">
						<svg
							class="eye-icon"
							viewBox="0 0 24 24"
							fill="none"
							stroke={color}
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
							/>
							<circle cx="12" cy="12" r="3" />
						</svg>
					</div>
				</button>
			</div>
		</div>

		<!-- Back Face -->
		<div class="card-face card-back">
			<div class="card-inner">
				<button
					class="color-section"
					style="background-color: {color};"
					onclick={() => on_copy_hex(color)}
					aria-label="Copy {color} to clipboard"
				>
					<div class="font-samples">
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
					</div>

					<div class="hex-overlay">
						<span class="hex-value">{color}</span>
					</div>

					<span class="copy-hint">Click to copy</span>
				</button>

				<button
					class="info-section"
					onclick={open_fontsource}
					aria-label="Open {font.name} on Fontsource"
				>
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

					<div class="font-details">
						<span
							class="font-name"
							style="font-family: {font.family};"
						>
							{font.name}
						</span>
						<span class="font-category">
							{font.category}
						</span>
					</div>

					<div class="eye-container">
						<svg
							class="eye-icon"
							viewBox="0 0 24 24"
							fill="none"
							stroke={color}
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
							/>
							<circle cx="12" cy="12" r="3" />
						</svg>
					</div>
				</button>
			</div>
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
		border-radius: 8px;
		background: white;
		box-shadow:
			0 10px 30px -5px rgba(0, 0, 0, 0.15),
			0 5px 15px -5px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		transition:
			box-shadow 300ms ease,
			transform 300ms ease;
	}

	.card-front {
		transform: rotateY(0deg);
	}

	.card-back {
		transform: rotateY(180deg);
	}

	/* 3D hover lift on the whole card */
	.card-container:hover .card-face {
		box-shadow:
			0 25px 50px -10px rgba(0, 0, 0, 0.2),
			0 15px 30px -10px rgba(0, 0, 0, 0.15);
		transform: rotateY(0deg) translateY(-8px) scale(1.02);
	}

	.card-container:hover .card-back {
		transform: rotateY(180deg) translateY(-8px) scale(1.02);
	}

	.card-container:hover .card-flipper.flipped .card-front {
		transform: rotateY(0deg);
	}

	.card-container:hover .card-flipper.flipped .card-back {
		transform: rotateY(180deg) translateY(-8px) scale(1.02);
	}

	.card-inner {
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
	}

	/* Color section (top) */
	.color-section {
		position: relative;
		flex: 1 1 68%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border: none;
		outline: none;
		overflow: hidden;
		transition: flex 300ms ease;
	}

	.font-samples {
		display: flex;
		flex-direction: column;
		align-items: center;
		transition:
			opacity 200ms ease,
			transform 200ms ease;
	}

	.sample-large {
		font-size: 3rem;
		font-weight: bold;
		opacity: 0.9;
		line-height: 1;
	}

	@media (min-width: 768px) {
		.sample-large {
			font-size: 3.5rem;
		}
	}

	@media (min-width: 1024px) {
		.sample-large {
			font-size: 4rem;
		}
	}

	.sample-small {
		margin-top: 0.5rem;
		font-size: 1.25rem;
		opacity: 0.7;
	}

	@media (min-width: 768px) {
		.sample-small {
			font-size: 1.5rem;
		}
	}

	/* Hex overlay - shows on color section hover */
	.hex-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.25);
		opacity: 0;
		transition: opacity 200ms ease;
	}

	.hex-value {
		padding: 0.5rem 1rem;
		border-radius: 4px;
		background: rgba(0, 0, 0, 0.5);
		font-family: ui-monospace, monospace;
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: white;
	}

	.copy-hint {
		position: absolute;
		bottom: 1.5rem;
		font-family: system-ui, sans-serif;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: white;
		opacity: 0;
		transform: translateY(10px);
		transition:
			opacity 200ms ease,
			transform 200ms ease;
	}

	/* Color section hover effects */
	.color-section:hover .font-samples {
		opacity: 0;
		transform: translateY(-10px);
	}

	.color-section:hover .hex-overlay {
		opacity: 1;
	}

	.color-section:hover .copy-hint {
		opacity: 1;
		transform: translateY(0);
	}

	/* Info section (bottom) */
	.info-section {
		position: relative;
		flex: 1 1 32%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem 0.5rem;
		text-align: center;
		cursor: pointer;
		border: none;
		background: white;
		width: 100%;
		transition: flex 300ms ease;
	}

	.dimple {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		transform: translateY(-99%);
	}

	.font-details {
		display: flex;
		flex-direction: column;
		align-items: center;
		transition:
			opacity 200ms ease,
			transform 200ms ease;
	}

	.font-name {
		font-size: 0.9rem;
		font-weight: 600;
		color: rgb(30 41 59);
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	@media (min-width: 768px) {
		.font-name {
			font-size: 1rem;
		}
	}

	.font-category {
		margin-top: 0.25rem;
		font-size: 0.7rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: rgb(148 163 184);
	}

	/* Eye icon container - appears below font details on hover */
	.eye-container {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 0.5rem;
		height: 0;
		opacity: 0;
		overflow: hidden;
		transition: all 300ms ease;
	}

	.eye-icon {
		width: 28px;
		height: 28px;
		transition: all 300ms ease;
	}

	/* Info section hover - show eye icon below font info */
	.info-section:hover .eye-container {
		height: 36px;
		opacity: 1;
	}

	/* Sliding animation when hovering different sections */
	.card-inner:has(.color-section:hover) .info-section {
		flex: 1 1 18%;
	}

	.card-inner:has(.color-section:hover) .color-section {
		flex: 1 1 82%;
	}

	.card-inner:has(.color-section:hover) .font-details {
		opacity: 0;
	}

	.card-inner:has(.color-section:hover) .eye-container {
		opacity: 0;
	}

	/* When hovering info section - color section slides up, info expands */
	.card-inner:has(.info-section:hover) .color-section {
		flex: 1 1 45%;
	}

	.card-inner:has(.info-section:hover) .color-section .font-samples {
		transform: translateY(-15px);
		opacity: 0.6;
	}

	.card-inner:has(.info-section:hover) .info-section {
		flex: 1 1 55%;
	}

	/* Focus styles */
	.color-section:focus-visible {
		outline: 2px solid rgba(255, 255, 255, 0.6);
		outline-offset: -4px;
	}

	.info-section:focus-visible {
		outline: 2px solid rgb(148 163 184);
		outline-offset: -4px;
	}
</style>
