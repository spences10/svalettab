import { browser } from '$app/environment';
import type { ColorFormat } from '$lib/contrast';

const STORAGE_KEY = 'svalettab-format';

function get_stored_format(): ColorFormat {
	if (!browser) return 'hex';
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'hex' || stored === 'hsl' || stored === 'oklch') {
		return stored;
	}
	return 'hex';
}

class FormatStore {
	current = $state<ColorFormat>(get_stored_format());

	set(format: ColorFormat) {
		this.current = format;
		if (browser) {
			localStorage.setItem(STORAGE_KEY, format);
		}
	}
}

export const format_store = new FormatStore();
