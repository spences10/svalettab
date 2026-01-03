import { browser } from '$app/environment';

export interface Font {
	name: string;
	family: string;
	category: 'sans' | 'serif' | 'mono' | 'display';
	fontsource_slug: string;
}

export const fonts: Font[] = [
	// ==========================================
	// SANS-SERIF (20 fonts)
	// ==========================================
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
	// New sans-serif fonts
	{
		name: 'Bricolage Grotesque',
		family: "'Bricolage Grotesque Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'bricolage-grotesque',
	},
	{
		name: 'Geist',
		family: "'Geist Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'geist',
	},
	{
		name: 'Figtree',
		family: "'Figtree Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'figtree',
	},
	{
		name: 'Commissioner',
		family: "'Commissioner Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'commissioner',
	},
	{
		name: 'Instrument Sans',
		family: "'Instrument Sans Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'instrument-sans',
	},
	{
		name: 'Lexend',
		family: "'Lexend Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'lexend',
	},
	{
		name: 'Albert Sans',
		family: "'Albert Sans Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'albert-sans',
	},
	{
		name: 'Archivo',
		family: "'Archivo Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'archivo',
	},
	{
		name: 'Darker Grotesque',
		family: "'Darker Grotesque Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'darker-grotesque',
	},
	{
		name: 'Epilogue',
		family: "'Epilogue Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'epilogue',
	},
	{
		name: 'Familjen Grotesk',
		family: "'Familjen Grotesk Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'familjen-grotesk',
	},
	{
		name: 'Jost',
		family: "'Jost Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'jost',
	},
	{
		name: 'Hanken Grotesk',
		family: "'Hanken Grotesk Variable', sans-serif",
		category: 'sans',
		fontsource_slug: 'hanken-grotesk',
	},

	// ==========================================
	// SERIF (12 fonts)
	// ==========================================
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
	// New serif fonts
	{
		name: 'Cormorant',
		family: "'Cormorant Variable', serif",
		category: 'serif',
		fontsource_slug: 'cormorant',
	},
	{
		name: 'EB Garamond',
		family: "'EB Garamond Variable', serif",
		category: 'serif',
		fontsource_slug: 'eb-garamond',
	},
	{
		name: 'Bodoni Moda',
		family: "'Bodoni Moda Variable', serif",
		category: 'serif',
		fontsource_slug: 'bodoni-moda',
	},
	{
		name: 'Libre Bodoni',
		family: "'Libre Bodoni Variable', serif",
		category: 'serif',
		fontsource_slug: 'libre-bodoni',
	},
	{
		name: 'Alegreya',
		family: "'Alegreya Variable', serif",
		category: 'serif',
		fontsource_slug: 'alegreya',
	},
	{
		name: 'Brygada 1918',
		family: "'Brygada 1918 Variable', serif",
		category: 'serif',
		fontsource_slug: 'brygada-1918',
	},
	{
		name: 'Literata',
		family: "'Literata Variable', serif",
		category: 'serif',
		fontsource_slug: 'literata',
	},

	// ==========================================
	// MONOSPACE (8 fonts)
	// ==========================================
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
	// New mono fonts
	{
		name: 'Geist Mono',
		family: "'Geist Mono Variable', monospace",
		category: 'mono',
		fontsource_slug: 'geist-mono',
	},
	{
		name: 'Inconsolata',
		family: "'Inconsolata Variable', monospace",
		category: 'mono',
		fontsource_slug: 'inconsolata',
	},
	{
		name: 'Azeret Mono',
		family: "'Azeret Mono Variable', monospace",
		category: 'mono',
		fontsource_slug: 'azeret-mono',
	},
	{
		name: 'Kode Mono',
		family: "'Kode Mono Variable', monospace",
		category: 'mono',
		fontsource_slug: 'kode-mono',
	},
	{
		name: 'Intel One Mono',
		family: "'Intel One Mono Variable', monospace",
		category: 'mono',
		fontsource_slug: 'intel-one-mono',
	},
	{
		name: 'Victor Mono',
		family: "'Victor Mono Variable', monospace",
		category: 'mono',
		fontsource_slug: 'victor-mono',
	},

	// ==========================================
	// DISPLAY & EXPERIMENTAL (15 fonts)
	// ==========================================
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
	// New display/experimental fonts
	{
		name: 'Anybody',
		family: "'Anybody Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'anybody',
	},
	{
		name: 'Climate Crisis',
		family: "'Climate Crisis Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'climate-crisis',
	},
	{
		name: 'Comfortaa',
		family: "'Comfortaa Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'comfortaa',
	},
	{
		name: 'Big Shoulders Display',
		family: "'Big Shoulders Display Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'big-shoulders-display',
	},
	{
		name: 'Foldit',
		family: "'Foldit Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'foldit',
	},
	{
		name: 'Kablammo',
		family: "'Kablammo Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'kablammo',
	},
	{
		name: 'DynaPuff',
		family: "'DynaPuff Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'dynapuff',
	},
	{
		name: 'Grandstander',
		family: "'Grandstander Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'grandstander',
	},
	{
		name: 'Gluten',
		family: "'Gluten Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'gluten',
	},
	{
		name: 'Fredoka',
		family: "'Fredoka Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'fredoka',
	},
	{
		name: 'Gabarito',
		family: "'Gabarito Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'gabarito',
	},
	{
		name: 'Unbounded',
		family: "'Unbounded Variable', sans-serif",
		category: 'display',
		fontsource_slug: 'unbounded',
	},
];

// ==========================================
// SEEN FONT TRACKING
// ==========================================

const SEEN_FONTS_KEY = 'svalettab-seen-fonts';
const MAX_SEEN_FONTS = Math.floor(fonts.length * 0.7); // Remember 70% of fonts

function get_seen_fonts(): Set<string> {
	if (!browser) return new Set();
	try {
		const stored = localStorage.getItem(SEEN_FONTS_KEY);
		if (!stored) return new Set();
		const parsed = JSON.parse(stored);
		return new Set(Array.isArray(parsed) ? parsed : []);
	} catch {
		return new Set();
	}
}

function save_seen_fonts(seen: Set<string>): void {
	if (!browser) return;
	try {
		// Keep only the most recent fonts
		const arr = Array.from(seen);
		const trimmed = arr.slice(-MAX_SEEN_FONTS);
		localStorage.setItem(SEEN_FONTS_KEY, JSON.stringify(trimmed));
	} catch {
		// Storage might be full, ignore
	}
}

function mark_fonts_as_seen(selected: Font[]): void {
	const seen = get_seen_fonts();
	for (const font of selected) {
		seen.add(font.fontsource_slug);
	}
	save_seen_fonts(seen);
}

// ==========================================
// FISHER-YATES SHUFFLE
// ==========================================

function shuffle_array<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

// ==========================================
// RANDOM FONT SELECTION
// ==========================================

export function get_random_fonts(count: number = 5): Font[] {
	const seen = get_seen_fonts();

	// Separate unseen and seen fonts
	const unseen = fonts.filter((f) => !seen.has(f.fontsource_slug));
	const seen_fonts = fonts.filter((f) => seen.has(f.fontsource_slug));

	// Shuffle both arrays
	const shuffled_unseen = shuffle_array(unseen);
	const shuffled_seen = shuffle_array(seen_fonts);

	// Prioritize unseen fonts, fall back to seen if needed
	const combined = [...shuffled_unseen, ...shuffled_seen];
	const selected = combined.slice(0, count);

	// Mark selected fonts as seen
	mark_fonts_as_seen(selected);

	return selected;
}

export function get_fontsource_url(font: Font): string {
	return `https://fontsource.org/fonts/${font.fontsource_slug}`;
}

export function clear_seen_fonts(): void {
	if (!browser) return;
	localStorage.removeItem(SEEN_FONTS_KEY);
}
