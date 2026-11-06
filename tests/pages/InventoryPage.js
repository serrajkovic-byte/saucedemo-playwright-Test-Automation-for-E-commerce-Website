export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.productCards = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addProduct(productId) {
    await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}

export default InventoryPage;
