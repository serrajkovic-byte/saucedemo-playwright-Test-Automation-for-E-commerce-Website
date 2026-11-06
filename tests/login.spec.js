import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { users, errorMessages } from './data/testData';

test.describe('SauceDemo - Authentication', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('LOGIN-01: login form controls are visible', async () => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('LOGIN-02: standard user can log in', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('LOGIN-03: locked-out user is rejected', async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(loginPage.errorMessage).toContainText(errorMessages.lockedOut);
  });

  test('LOGIN-04: unknown username is rejected', async () => {
    await loginPage.login(users.unknown.username, users.unknown.password);
    await expect(loginPage.errorMessage).toContainText(errorMessages.invalidCredentials);
  });

  test('LOGIN-05: incorrect password is rejected', async () => {
    await loginPage.login(users.wrongPassword.username, users.wrongPassword.password);
    await expect(loginPage.errorMessage).toContainText(errorMessages.invalidCredentials);
  });

  test('LOGIN-06: empty username and password are rejected', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toContainText(errorMessages.usernameRequired);
  });

  test('LOGIN-07: missing password is rejected', async () => {
    await loginPage.login(users.standard.username, '');
    await expect(loginPage.errorMessage).toContainText(errorMessages.passwordRequired);
  });

  test('LOGIN-08: missing username is rejected', async () => {
    await loginPage.login('', users.standard.password);
    await expect(loginPage.errorMessage).toContainText(errorMessages.usernameRequired);
  });

  test('LOGIN-09: password field is masked', async () => {
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });
});
