import {test } from '@playwright/test';

test('display day orders amount metric', async ({ page }) => {
    await page.goto('/', {waitUntil: 'networkidle'});

    await expect( page.getByText('0', { exact: true })).toBeVisible()
    await expect( page.getByText('-em relação a ontem', { exact: true })).toBeVisible()
  });

  test('display month orders amount metric', async ({ page }) => {
    await page.goto('/', {waitUntil: 'networkidle'});

    await expect( page.getByText('0', { exact: true })).toBeVisible()
    await expect( page.getByText('+0em relação ao mês passado', { exact: true })).toBeVisible()
  });

  test('display month orders canceled amount metric', async ({ page }) => {
    await page.goto('/', {waitUntil: 'networkidle'});

    await expect( page.getByText('0', { exact: true })).toBeVisible()
    await expect( page.getByText('+em relação ao mês passado', { exact: true })).toBeVisible()
  });

  test('display month revenue metric', async ({ page }) => {
    await page.goto('/', {waitUntil: 'networkidle'});

    await expect( page.getByText('R$ NaN', { exact: true })).toBeVisible()
    await expect( page.getByText('%em relação a ontem', { exact: true })).toBeVisible()
  }); 