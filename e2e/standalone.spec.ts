import { expect, test } from '@playwright/test';

test('navigate to lvl1', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('standalone-lvl1').click();

  await expect(page).toHaveURL('/en/standaloneTranslated/lvl1Translated');

  await expect(page.getByText('StandaloneLvl1')).toBeVisible();
});

test('direct navigation to lvl1', async ({ page }) => {
  await page.goto('/en/standaloneTranslated/lvl1Translated');

  await expect(page).toHaveURL('/en/standaloneTranslated/lvl1Translated');

  await expect(page.getByText('StandaloneLvl1')).toBeVisible();
});

test('navigate to lvl2', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('standalone-lvl1').click();

  await expect(page).toHaveURL('/en/standaloneTranslated/lvl1Translated');

  await expect(page.getByText('StandaloneLvl1')).toBeVisible();

  await page.getByTestId('standalone-lvl2').click();

  await expect(page).toHaveURL('/en/standaloneTranslated/lvl1Translated/lvl2Translated');

  await expect(page.getByRole('heading', { name: 'StandaloneLvl2Component' })).toBeVisible();
});

test('direct navigation to lvl2', async ({ page }) => {
  await page.goto('/en/standaloneTranslated/lvl1Translated/lvl2Translated');

  await expect(page).toHaveURL('/en/standaloneTranslated/lvl1Translated/lvl2Translated');

  await expect(page.getByRole('heading', { name: 'StandaloneLvl2Component' })).toBeVisible();
});
