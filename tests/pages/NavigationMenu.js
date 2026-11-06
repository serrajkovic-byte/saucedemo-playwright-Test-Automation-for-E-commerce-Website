export class NavigationMenu {
  constructor(page) {
    this.page = page;
    this.openButton = page.locator('#react-burger-menu-btn');
    this.closeButton = page.locator('#react-burger-cross-btn');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetLink = page.locator('#reset_sidebar_link');
  }

  async open() { await this.openButton.click(); }
  async close() { await this.closeButton.click(); }
  async logout() { await this.logoutLink.click(); }
  async resetAppState() { await this.resetLink.click(); }
}

export default NavigationMenu;
