import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { users, products, checkoutInfo, errorMessages } from './data/testData';

test.describe('SauceDemo - Checkout', () => {
  let inventory;
  let cart;
  let checkout;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);
    await inventory.addProduct(products.backpack.id);
    await inventory.openCart();
    await cart.checkout();
  });

  test('CHECK-01: checkout information fields are visible', async () => {
    await expect(checkout.firstNameInput).toBeVisible();
    await expect(checkout.lastNameInput).toBeVisible();
    await expect(checkout.postalCodeInput).toBeVisible();
  });

  test('CHECK-02: first name is required', async () => {
    await checkout.fillInformation('', checkoutInfo.lastName, checkoutInfo.postalCode);
    await checkout.continueButton.click();
    await expect(checkout.errorMessage).toContainText(errorMessages.firstNameRequired);
  });

  test('CHECK-03: last name is required', async () => {
    await checkout.fillInformation(checkoutInfo.firstName, '', checkoutInfo.postalCode);
    await checkout.continueButton.click();
    await expect(checkout.errorMessage).toContainText(errorMessages.lastNameRequired);
  });

  test('CHECK-04: postal code is required', async () => {
    await checkout.fillInformation(checkoutInfo.firstName, checkoutInfo.lastName, '');
    await checkout.continueButton.click();
    await expect(checkout.errorMessage).toContainText(errorMessages.postalCodeRequired);
  });

  test('CHECK-05: user can complete a purchase', async ({ page }) => {
    await checkout.fillInformation(
      checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postalCode
    );
    await checkout.continueButton.click();
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
    await expect(checkout.subtotal).toBeVisible();
    await expect(checkout.tax).toBeVisible();
    await expect(checkout.total).toBeVisible();
    await checkout.finishButton.click();
    await expect(checkout.completeHeader).toContainText(/Thank you for your order/i);
  });
});
