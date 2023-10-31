import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async removeProductsFromCart() {
    await this.page.request.post('https://www.devart.com/api/cart/remove-cart', {});
  }

  async goBack() {
    await this.page.goBack();
  }
}
