export interface Font {
	name: string;
	family: string;
	category: 'sans' | 'serif' | 'mono' | 'display';
	fontsourceSlug: string;
}

export const fonts: Font[] = [
	// Sans
	{
		name: 'Space Grotesk',
		family: "'Space Grotesk Variable', sans-serif",
		category: 'sans',
		fontsourceSlug: 'space-grotesk',
	},
	{
		name: 'Outfit',
		family: "'Outfit Variable', sans-serif",
		category: 'sans',
		fontsourceSlug: 'outfit',
	},
	{
		name: 'Sora',
		family: "'Sora Variable', sans-serif",
		category: 'sans',
		fontsourceSlug: 'sora',
	},
	{
		name: 'Work Sans',
		family: "'Work Sans Variable', sans-serif",
		category: 'sans',
		fontsourceSlug: 'work-sans',
	},
	{
		name: 'DM Sans',
		family: "'DM Sans Variable', sans-serif",
		category: 'sans',
		fontsourceSlug: 'dm-sans',
	},
	{
		name: 'Manrope',
		family: "'Manrope Variable', sans-serif",
		category: 'sans',
		fontsourceSlug: 'manrope',
	},
	{
		name: 'Inter',
		family: "'Inter Variable', sans-serif",
		category: 'sans',
		fontsourceSlug: 'inter',
	},

	// Serif
	{
		name: 'Playfair Display',
		family: "'Playfair Display Variable', serif",
		category: 'serif',
		fontsourceSlug: 'playfair-display',
	},
	{
		name: 'Crimson Pro',
		family: "'Crimson Pro Variable', serif",
		category: 'serif',
		fontsourceSlug: 'crimson-pro',
	},
	{
		name: 'Fraunces',
		family: "'Fraunces Variable', serif",
		category: 'serif',
		fontsourceSlug: 'fraunces',
	},
	{
		name: 'Bitter',
		family: "'Bitter Variable', serif",
		category: 'serif',
		fontsourceSlug: 'bitter',
	},
	{
		name: 'Lora',
		family: "'Lora Variable', serif",
		category: 'serif',
		fontsourceSlug: 'lora',
	},

	// Mono
	{
		name: 'JetBrains Mono',
		family: "'JetBrains Mono Variable', monospace",
		category: 'mono',
		fontsourceSlug: 'jetbrains-mono',
	},
	{
		name: 'Source Code Pro',
		family: "'Source Code Pro Variable', monospace",
		category: 'mono',
		fontsourceSlug: 'source-code-pro',
	},
	{
		name: 'Fira Code',
		family: "'Fira Code Variable', monospace",
		category: 'mono',
		fontsourceSlug: 'fira-code',
	},

	// Display
	{
		name: 'Josefin Sans',
		family: "'Josefin Sans Variable', sans-serif",
		category: 'display',
		fontsourceSlug: 'josefin-sans',
	},
	{
		name: 'Raleway',
		family: "'Raleway Variable', sans-serif",
		category: 'display',
		fontsourceSlug: 'raleway',
	},
	{
		name: 'Quicksand',
		family: "'Quicksand Variable', sans-serif",
		category: 'display',
		fontsourceSlug: 'quicksand',
	},
];

export function getRandomFonts(count: number = 5): Font[] {
	const shuffled = [...fonts].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}

export function getFontsourceUrl(font: Font): string {
	return `https://fontsource.org/fonts/${font.fontsourceSlug}`;
}
