import { expect, test } from '@playwright/test';

test('update profile successfully', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Expect a title "to contain" a substring.
    // await expect(page).toHaveTitle(/Playwright/);
  
    // só deixa passar se o campo tiver o values de fill.

   await page.getByRole('button', { name: 'Pizza Yans' }).click();

    await page.getByRole('menuitem', { name: 'Perfil da loja'}).click()

    await page.getByLabel('Nome').fill('Pizza Shop')
    await page.getByLabel('Description').fill('Another Description')
  
    //botão e clicar
    await page.getByRole('button', { name: 'Salvar' }).click()

    await page.waitForLoadState('networkidle')

    const toast = page.getByText('Perfil atualizado com sucesso!')

    await expect(toast).toBeVisible()

    await page.getByRole('button', { name: 'Close' }).click()

    await page.waitForTimeout(250)

    await expect(page.getByRole('button', { name: 'Pizza Shop' })).toBeVisible()
  
    
  });