import { expect, test } from '@playwright/test';

test.describe('details', () => {
  test('show matcherDetails for id', async ({ page }) => {
    await page.goto('/en/mymatcher/12345678');

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher on detail' })).toBeVisible();
    // verify params
    await expect(page.getByText('id: 12345678')).toBeVisible();
  });

  test('show matcherDetails for param/id', async ({ page }) => {
    await page.goto('/en/mymatcher/aaa/12345678');

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher on detail' })).toBeVisible();
    // verify params
    await expect(page.getByText('a: aaa')).toBeVisible();
    await expect(page.getByText('id: 12345678')).toBeVisible();
  });

  test('show matcherDetails for param/param/id', async ({ page }) => {
    await page.goto('/en/mymatcher/aaa/bbb/12345678');

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher on detail' })).toBeVisible();
    // verify params
    await expect(page.getByText('a: aaa')).toBeVisible();
    await expect(page.getByText('b: bbb')).toBeVisible();
    await expect(page.getByText('id: 12345678')).toBeVisible();
  });

  test('show matcherDetails for param/param/param/id', async ({ page }) => {
    await page.goto('/en/mymatcher/aaa/bbb/ccc/12345678');

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher on detail' })).toBeVisible();
    // verify params
    await expect(page.getByText('a: aaa')).toBeVisible();
    await expect(page.getByText('b: bbb')).toBeVisible();
    await expect(page.getByText('c: ccc')).toBeVisible();
    await expect(page.getByText('id: 12345678')).toBeVisible();
  });

  test('show matcherDetails for string id', async ({ page }) => {
    await page.goto('/en/mymatcher/abcdef12');

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher on detail' })).toBeVisible();
    // verify params
    await expect(page.getByText('id: abcdef12')).toBeVisible();
  });

  test('show not show matcherDetails for param/param/param/paramMap', async ({ page }) => {
    await page.goto('/en/mymatcher/aaa/bbb/ccc/1234567'); // id must be 8 long

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher on detail' })).not.toBeVisible();
  });
});

test.describe('base', () => {
  test('show baseMatcher for no param', async ({ page }) => {
    await page.goto('/en/mymatcher');

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher base' })).toBeVisible();
  });

  test('show baseMatcher for /mapPage', async ({ page }) => {
    await page.goto('/en/mymatcher/1');

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher base' })).toBeVisible();
    // verify params
    await expect(page.getByText('mapPage: 1')).toBeVisible();
  });

  test('show baseMatcher for /param', async ({ page }) => {
    await page.goto('/en/mymatcher/aaa/2');

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher base' })).toBeVisible();
    // verify params
    await expect(page.getByText('a: aaa')).toBeVisible();
  });

  test('show baseMatcher for param/mapPage', async ({ page }) => {
    await page.goto('/en/mymatcher/aaa/2');

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher base' })).toBeVisible();
    // verify params
    await expect(page.getByText('a: aaa')).toBeVisible();
    await expect(page.getByText('mapPage: 2')).toBeVisible();
  });

  test('show baseMatcher for param/param', async ({ page }) => {
    await page.goto('/en/mymatcher/aaa/bbb');

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher base' })).toBeVisible();
    // verify params
    await expect(page.getByText('a: aaa')).toBeVisible();
    await expect(page.getByText('b: bbb')).toBeVisible();
  });

  test('show baseMatcher for param/param/mapPage', async ({ page }) => {
    await page.goto('/en/mymatcher/aaa/bbb/3');

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher base' })).toBeVisible();
    // verify params
    await expect(page.getByText('a: aaa')).toBeVisible();
    await expect(page.getByText('b: bbb')).toBeVisible();
    await expect(page.getByText('mapPage: 3')).toBeVisible();
  });

  test('show baseMatcher for param/param/param', async ({ page }) => {
    await page.goto('/en/mymatcher/aaa/bbb/ccc');

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher base' })).toBeVisible();
    // verify params
    await expect(page.getByText('a: aaa')).toBeVisible();
    await expect(page.getByText('b: bbb')).toBeVisible();
    await expect(page.getByText('c: ccc')).toBeVisible();
  });

  test('show baseMatcher for param/param/param/mapPage', async ({ page }) => {
    await page.goto('/en/mymatcher/aaa/bbb/ccc/4');

    await expect(page.getByRole('heading', { level: 2, name: 'Matcher base' })).toBeVisible();
    // verify params
    await expect(page.getByText('a: aaa')).toBeVisible();
    await expect(page.getByText('b: bbb')).toBeVisible();
    await expect(page.getByText('c: ccc')).toBeVisible();
    await expect(page.getByText('mapPage: 4')).toBeVisible();
  });
});
