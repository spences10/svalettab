import { browser } from '$app/environment';

type Theme = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'svalettab-theme';

function get_system_theme(): ResolvedTheme {
	if (!browser) return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
}

function get_stored_theme(): Theme {
	if (!browser) return 'system';
	const stored = localStorage.getItem(STORAGE_KEY);
	if (
		stored === 'light' ||
		stored === 'dark' ||
		stored === 'system'
	) {
		return stored;
	}
	return 'system';
}

class ThemeStore {
	current = $state<Theme>(get_stored_theme());
	#system = $state<ResolvedTheme>(get_system_theme());

	resolved = $derived<ResolvedTheme>(
		this.current === 'system' ? this.#system : this.current,
	);

	constructor() {
		if (browser) {
			const media_query = window.matchMedia(
				'(prefers-color-scheme: dark)',
			);
			media_query.addEventListener('change', (e) => {
				this.#system = e.matches ? 'dark' : 'light';
			});
		}
	}

	set(new_theme: Theme) {
		this.current = new_theme;
		if (browser) {
			localStorage.setItem(STORAGE_KEY, new_theme);
		}
	}

	cycle() {
		const order: Theme[] = ['system', 'light', 'dark'];
		const current_index = order.indexOf(this.current);
		const next_index = (current_index + 1) % order.length;
		this.set(order[next_index]);
	}
}

export const theme_store = new ThemeStore();
