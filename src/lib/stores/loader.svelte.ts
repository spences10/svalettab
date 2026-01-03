import { browser } from '$app/environment';

const STORAGE_KEY = 'svalettab-loader';

function get_stored_preference(): boolean {
	if (!browser) return true;
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'false') return false;
	return true; // Default: enabled
}

class LoaderStore {
	enabled = $state<boolean>(get_stored_preference());

	toggle() {
		this.enabled = !this.enabled;
		if (browser) {
			localStorage.setItem(STORAGE_KEY, String(this.enabled));
		}
	}

	set(value: boolean) {
		this.enabled = value;
		if (browser) {
			localStorage.setItem(STORAGE_KEY, String(value));
		}
	}
}

export const loader_store = new LoaderStore();
