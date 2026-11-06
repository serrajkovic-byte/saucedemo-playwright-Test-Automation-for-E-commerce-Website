import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { users, products } from './data/testData';

test.describe('SauceDemo - Shopping Cart', () => {
  let inventory;
  let cart;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);
    await expect(inventory.title).toHaveText('Products');
  });

  test('CART-01: adding one product updates the badge and cart', async ({ page }) => {
    await inventory.addProduct(products.backpack.id);
    await expect(inventory.cartBadge).toHaveText('1');
    await inventory.openCart();
    await expect(cart.cartItems).toHaveCount(1);
    await expect(cart.itemNames).toContainText(products.backpack.name);
  });

  test('CART-02: adding two products updates the badge to two', async () => {
    await inventory.addProduct(products.backpack.id);
    await inventory.addProduct(products.bikeLight.id);
    await expect(inventory.cartBadge).toHaveText('2');
    await inventory.openCart();
    await expect(cart.cartItems).toHaveCount(2);
    await expect(cart.itemNames).toContainText([products.backpack.name, products.bikeLight.name]);
  });

  test('CART-03: product can be removed from the cart', async () => {
    await inventory.addProduct(products.backpack.id);
    await inventory.openCart();
    await cart.removeProduct(products.backpack.id);
    await expect(cart.cartItems).toHaveCount(0);
    await expect(cart.cartBadge).toHaveCount(0);
  });

  test('CART-04: Continue Shopping returns to Products', async ({ page }) => {
    await inventory.openCart();
    await cart.continueShoppingButton.click();
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(inventory.title).toHaveText('Products');
  });
});
