import { backOut, cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

interface FlyInParams {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	y?: number;
}

interface FlipParams {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	direction?: 'in' | 'out';
}

// Fly in from bottom with optional stagger
export function flyIn(
	node: Element,
	{
		delay = 0,
		duration = 500,
		easing = backOut,
		y = 100,
	}: FlyInParams = {},
): TransitionConfig {
	return {
		delay,
		duration,
		easing,
		css: (t) => `
			opacity: ${t};
			transform: translateY(${(1 - t) * y}px);
		`,
	};
}

// 3D flip for card face (front)
export function flipOut(
	node: Element,
	{ delay = 0, duration = 500, easing = cubicOut }: FlipParams = {},
): TransitionConfig {
	return {
		delay,
		duration,
		easing,
		css: (t) => `
			transform: perspective(1200px) rotateY(${(1 - t) * -180}deg);
			backface-visibility: hidden;
		`,
	};
}

// 3D flip for card face (back)
export function flipIn(
	node: Element,
	{ delay = 0, duration = 500, easing = cubicOut }: FlipParams = {},
): TransitionConfig {
	return {
		delay,
		duration,
		easing,
		css: (t) => `
			transform: perspective(1200px) rotateY(${(1 - t) * 180}deg);
			backface-visibility: hidden;
		`,
	};
}

// Calculate stagger delay from center outward (like original Palettab)
// For 5 cards: center=0, adjacent=1, outer=2 -> delays: 0ms, 100ms, 200ms
export function getCenterOutDelay(
	index: number,
	total: number = 5,
	baseDelay: number = 100,
): number {
	const center = Math.floor(total / 2);
	const distance = Math.abs(index - center);
	return distance * baseDelay;
}

// Calculate stagger delay from edges inward (reverse of above)
export function getEdgeInDelay(
	index: number,
	total: number = 5,
	baseDelay: number = 100,
): number {
	const center = Math.floor(total / 2);
	const maxDistance = center;
	const distance = Math.abs(index - center);
	return (maxDistance - distance) * baseDelay;
}
