import { expect, test } from '@playwright/test';

test('home page shows the palette generator', async ({ page }) => {
	await page.goto('/');
	await expect(
		page.getByRole('button', {
			name: 'Generate new palette (press Space or R)',
		}),
	).toBeVisible();
});
