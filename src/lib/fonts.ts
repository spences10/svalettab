export interface Font {
	name: string;
	family: string;
	category: 'sans' | 'serif' | 'mono' | 'display';
	fontsource_slug: string;
}

export const fonts: Font[] = [
	// Sans
	{
		name: 'Space Grotesk',
		family: "'Space Grotesk Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'space-grotesk',
	},
	{
		name: 'Outfit',
		family: "'Outfit Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'outfit',
	},
	{
		name: 'Sora',
		family: "'Sora Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'sora',
	},
	{
		name: 'Work Sans',
		family: "'Work Sans Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'work-sans',
	},
	{
		name: 'DM Sans',
		family: "'DM Sans Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'dm-sans',
	},
	{
		name: 'Manrope',
		family: "'Manrope Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'manrope',
	},
	{
		name: 'Inter',
		family: "'Inter Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'inter',
	},

	// Serif
	{
		name: 'Playfair Display',
		family: "'Playfair Display Variable', serif",
		category: 'serif',
		fontsource_slug: 'playfair-display',
	},
	{
		name: 'Crimson Pro',
		family: "'Crimson Pro Variable', serif",
		category: 'serif',
		fontsource_slug: 'crimson-pro',
	},
	{
		name: 'Fraunces',
		family: "'Fraunces Variable', serif",
		category: 'serif',
		fontsource_slug: 'fraunces',
	},
	{
		name: 'Bitter',
		family: "'Bitter Variable', serif",
		category: 'serif',
		fontsource_slug: 'bitter',
	},
	{
		name: 'Lora',
		family: "'Lora Variable', serif",
		category: 'serif',
		fontsource_slug: 'lora',
	},

	// Mono
	{
		name: 'JetBrains Mono',
		family: "'JetBrains Mono Variable', monospace",
		category: 'mono',
		fontsource_slug: 'jetbrains-mono',
	},
	{
		name: 'Source Code Pro',
		family: "'Source Code Pro Variable', monospace",
		category: 'mono',
		fontsource_slug: 'source-code-pro',
	},
	{
		name: 'Fira Code',
		family: "'Fira Code Variable', monospace",
		category: 'mono',
		fontsource_slug: 'fira-code',
	},

	// Display
	{
		name: 'Josefin Sans',
		family: "'Josefin Sans Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'josefin-sans',
	},
	{
		name: 'Raleway',
		family: "'Raleway Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'raleway',
	},
	{
		name: 'Quicksand',
		family: "'Quicksand Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'quicksand',
	},
];

export function get_random_fonts(count: number = 5): Font[] {
	const shuffled = [...fonts].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}

export function get_fontsource_url(font: Font): string {
	return `https://fontsource.org/fonts/${font.fontsource_slug}`;
}
