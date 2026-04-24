import { expect, test } from '@playwright/test';

test('redirect to 404 page', async ({ page }) => {
  await page.goto('/en/iDoNotExist');

  await expect(page).toHaveURL('/en/404');
});
