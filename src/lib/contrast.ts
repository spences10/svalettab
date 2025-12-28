/**
 * Calculate relative luminance of a color
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function get_luminance(hex: string): number {
	const rgb = hex_to_rgb(hex);
	const [r, g, b] = rgb.map((c) => {
		const s_rgb = c / 255;
		return s_rgb <= 0.03928
			? s_rgb / 12.92
			: Math.pow((s_rgb + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hex_to_rgb(hex: string): [number, number, number] {
	const cleaned = hex.replace('#', '');
	const bigint = parseInt(cleaned, 16);
	return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

/**
 * Returns the best contrasting text color (black or white) for a given background
 */
export function get_contrast_color(background_color: string): string {
	const luminance = get_luminance(background_color);
	// Using 0.179 as threshold (middle of the luminance scale adjusted for perception)
	return luminance > 0.179 ? '#000000' : '#FFFFFF';
}

/**
 * Returns a slightly transparent version of the contrast color for secondary text
 */
export function get_secondary_contrast_color(
	background_color: string,
): string {
	const luminance = get_luminance(background_color);
	return luminance > 0.179
		? 'rgba(0, 0, 0, 0.6)'
		: 'rgba(255, 255, 255, 0.7)';
}

/**
 * Calculate WCAG contrast ratio between two colors
 * https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function get_contrast_ratio(fg: string, bg: string): number {
	const l1 = get_luminance(fg);
	const l2 = get_luminance(bg);
	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);
	return (lighter + 0.05) / (darker + 0.05);
}

export type WcagRating = 'AAA' | 'AA' | 'Fail';

/**
 * Get WCAG rating based on contrast ratio (for normal text)
 */
export function get_wcag_rating(ratio: number): WcagRating {
	if (ratio >= 7) return 'AAA';
	if (ratio >= 4.5) return 'AA';
	return 'Fail';
}

/**
 * Convert hex to HSL string
 */
export function hex_to_hsl(hex: string): string {
	const [r, g, b] = hex_to_rgb(hex).map((c) => c / 255);

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;

	if (max === min) {
		return `hsl(0, 0%, ${Math.round(l * 100)}%)`;
	}

	const d = max - min;
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

	let h = 0;
	switch (max) {
		case r:
			h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
			break;
		case g:
			h = ((b - r) / d + 2) / 6;
			break;
		case b:
			h = ((r - g) / d + 4) / 6;
			break;
	}

	return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

/**
 * Convert hex to OKLCH string (approximate)
 */
export function hex_to_oklch(hex: string): string {
	const [r, g, b] = hex_to_rgb(hex).map((c) => c / 255);

	// Convert to linear RGB
	const to_linear = (c: number) =>
		c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

	const lr = to_linear(r);
	const lg = to_linear(g);
	const lb = to_linear(b);

	// RGB to OKLab
	const l_ =
		0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
	const m_ =
		0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
	const s_ =
		0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

	const l_cubed = Math.cbrt(l_);
	const m_cubed = Math.cbrt(m_);
	const s_cubed = Math.cbrt(s_);

	const L =
		0.2104542553 * l_cubed +
		0.793617785 * m_cubed -
		0.0040720468 * s_cubed;
	const a =
		1.9779984951 * l_cubed -
		2.428592205 * m_cubed +
		0.4505937099 * s_cubed;
	const _b =
		0.0259040371 * l_cubed +
		0.7827717662 * m_cubed -
		0.808675766 * s_cubed;

	// OKLab to OKLCH
	const C = Math.sqrt(a * a + _b * _b);
	let H = Math.atan2(_b, a) * (180 / Math.PI);
	if (H < 0) H += 360;

	return `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(1)})`;
}

export type ColorFormat = 'hex' | 'hsl' | 'oklch';

/**
 * Format a hex color in the specified format
 */
export function format_color(
	hex: string,
	format: ColorFormat,
): string {
	switch (format) {
		case 'hex':
			return hex.toUpperCase();
		case 'hsl':
			return hex_to_hsl(hex);
		case 'oklch':
			return hex_to_oklch(hex);
	}
}
