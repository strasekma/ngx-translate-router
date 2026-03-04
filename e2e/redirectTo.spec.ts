import { expect, test } from '@playwright/test';

test('translated conditional without redirect', async ({ page }) => {
  await page.goto('/en/conditionalRedirectToTranslated');

  await expect(page).toHaveURL('/en/destination/conditionalTranslatedWithoutRedirect');

  expect(page.getByTestId('param')).toContainText('conditionalTranslatedWithoutRedirect');
});

test('translated conditional with redirect', async ({ page }) => {
  await page.goto('/en/conditionalRedirectToTranslated?redirect=true');

  await expect(page).toHaveURL('/en/destination/conditionalTranslatedWithRedirect');

  expect(page.getByTestId('param')).toContainText('conditionalTranslatedWithRedirect');
});

test('not translated conditional without redirect', async ({ page }) => {
  await page.goto('/en/conditionalRedirectTo');

  await expect(page).toHaveURL('/en/destination/conditionalNonTranslatedWithoutRedirect');

  expect(page.getByTestId('param')).toContainText('conditionalNonTranslatedWithoutRedirect');
});

test('not translated conditional with redirect', async ({ page }) => {
  await page.goto('/en/conditionalRedirectTo?redirect=true');

  await expect(page).toHaveURL('/en/destination/conditionalNonTranslatedWithRedirect');

  expect(page.getByTestId('param')).toContainText('conditionalNonTranslatedWithRedirect');
});

test('root redirect', async ({ page }) => {
  await page.goto('/en/root-redirection');

  await expect(page).toHaveURL('/en');
});

test('redirect with skipRouteLocalization', async ({ page }) => {
  await page.goto('/toredirect');

  await expect(page).toHaveURL('/en/home');
});
