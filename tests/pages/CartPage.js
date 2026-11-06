export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async removeProduct(productId) {
    await this.page.locator(`[data-test="remove-${productId}"]`).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

export default CartPage;
