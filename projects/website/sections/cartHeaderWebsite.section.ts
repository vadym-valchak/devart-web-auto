import { Locator, Page, expect } from '@playwright/test';

export class CartHeaderWebsiteSection {
  private readonly page: Page;
  private readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = this.page.locator("[title = 'Cart']");
  }

  async openCartDropdown() {
    await this.cartIcon.click();
  }
}
