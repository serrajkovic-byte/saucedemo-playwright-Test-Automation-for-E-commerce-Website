import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { NavigationMenu } from './pages/NavigationMenu';
import { users, products } from './data/testData';

test.describe('SauceDemo - Burger Menu', () => {
  let inventory;
  let menu;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    inventory = new InventoryPage(page);
    menu = new NavigationMenu(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);
    await expect(inventory.title).toHaveText('Products');
  });

  test('MENU-01: menu opens and navigation links are visible', async () => {
    await menu.open();
    await expect(menu.allItemsLink).toBeVisible();
    await expect(menu.aboutLink).toBeVisible();
    await expect(menu.logoutLink).toBeVisible();
    await expect(menu.resetLink).toBeVisible();
  });

  test('MENU-02: menu can be closed', async () => {
    await menu.open();
    await menu.close();
    await expect(menu.logoutLink).toBeHidden();
  });

  test('MENU-03: user can log out', async ({ page }) => {
    await menu.open();
    await menu.logout();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('MENU-04: Reset App State clears the cart', async () => {
    await inventory.addProduct(products.backpack.id);
    await expect(inventory.cartBadge).toHaveText('1');
    await menu.open();
    await menu.resetAppState();
    await expect(inventory.cartBadge).toHaveCount(0);
  });
});
