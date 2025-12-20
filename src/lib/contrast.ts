/**
 * Calculate relative luminance of a color
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function getLuminance(hex: string): number {
	const rgb = hexToRgb(hex);
	const [r, g, b] = rgb.map((c) => {
		const sRGB = c / 255;
		return sRGB <= 0.03928
			? sRGB / 12.92
			: Math.pow((sRGB + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex: string): [number, number, number] {
	const cleaned = hex.replace('#', '');
	const bigint = parseInt(cleaned, 16);
	return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

/**
 * Returns the best contrasting text color (black or white) for a given background
 */
export function getContrastColor(backgroundColor: string): string {
	const luminance = getLuminance(backgroundColor);
	// Using 0.179 as threshold (middle of the luminance scale adjusted for perception)
	return luminance > 0.179 ? '#000000' : '#FFFFFF';
}

/**
 * Returns a slightly transparent version of the contrast color for secondary text
 */
export function getSecondaryContrastColor(
	backgroundColor: string,
): string {
	const luminance = getLuminance(backgroundColor);
	return luminance > 0.179
		? 'rgba(0, 0, 0, 0.6)'
		: 'rgba(255, 255, 255, 0.7)';
}
