import { test, expect } from '@playwright/test';

test('signup successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' });

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);

  //só deixa passar se o campo tiver o values de fill.
  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByLabel('Seu celular').fill('312312454534')

  //botão e clicar
  await page.getByRole('button', { name: 'Finalizar cadastro' })

  const toast = page.getByText('Restaurante cadastro com sucesso')

  expect(toast).toBeVisible()

  //   await page.waitForTimeout(2000)
});

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' });

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);

  //só deixa passar se o campo tiver o values de fill.
  await page.getByLabel('Nome do estabelecimento').fill('Invalid Shop')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByLabel('Seu celular').fill('312312454534')

    //botão e clicar
    await page.getByRole('button', { name: 'Finalizar cadastro' })

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
});

test('navigate to new login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' });

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')

});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


