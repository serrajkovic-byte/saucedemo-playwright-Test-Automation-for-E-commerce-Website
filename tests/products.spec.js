import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { users } from './data/testData';

test.describe('SauceDemo - Products', () => {
  let inventory;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    inventory = new InventoryPage(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);
    await expect(inventory.title).toHaveText('Products');
  });

  test('PROD-01: products page displays six products', async () => {
    await expect(inventory.productCards).toHaveCount(6);
  });

  test('PROD-02: product names and prices are visible', async () => {
    await expect(inventory.productNames).toHaveCount(6);
    await expect(inventory.productPrices).toHaveCount(6);
    await expect(inventory.productNames.first()).toBeVisible();
    await expect(inventory.productPrices.first()).toBeVisible();
  });

  test('PROD-03: products can be sorted by name A to Z', async () => {
    await inventory.sortSelect.selectOption('az');
    const names = await inventory.productNames.allTextContents();
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test('PROD-04: products can be sorted by price low to high', async () => {
    await inventory.sortSelect.selectOption('lohi');
    const prices = (await inventory.productPrices.allTextContents())
      .map(value => Number(value.replace('$', '')));
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('PROD-05: products can be sorted by price high to low', async () => {
    await inventory.sortSelect.selectOption('hilo');
    const prices = (await inventory.productPrices.allTextContents())
      .map(value => Number(value.replace('$', '')));
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });
});
