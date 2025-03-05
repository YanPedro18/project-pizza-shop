import { test, expect } from '@playwright/test';

test('has title sign succesfully', async ({ page }) => {
  await page.goto('/sign-in', {waitUntil: 'networkidle'});

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);

  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Acessar painel'})

  const toast = page.getByText('Enviamos um link de autenticação para seu e-mail.')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
});

test('has title', async ({ page }) => {
  await page.goto('/sign-in', {waitUntil: 'networkidle'});

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);

  await page.getByLabel('Seu e-mail').fill('jwrong@example.com') 
  await page.getByRole('button', { name: 'Acessar painel'})

  const toast = page.getByText('Credenciais inválidas.')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
});

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', {waitUntil: 'networkidle'});

  await page.getByRole('button', { name: 'Acessar painel' }).click()

  expect(page.url()).toContain('/sign-up')

}); 

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


