import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render the refresh button', async () => {
		render(Page);

		const refresh_button = page.getByRole('button', {
			name: 'Generate new palette (press Space or R)',
		});
		await expect.element(refresh_button).toBeInTheDocument();
	});
});
