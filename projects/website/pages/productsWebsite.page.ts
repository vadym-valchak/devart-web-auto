import { Locator, Page, expect } from '@playwright/test';

export class ProductsWebsitePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickDownloadButtonForProduct(productUrl: string) {
    await this.page.locator(`[href='${productUrl}']`).click();
  }

  async clickViewPricingOptionsForProduct(productUrl: string) {
    await this.page.locator(`[href='${productUrl}']`).getByText('View pricing options').click();
  }

  async filterProductsByCategory(category: string) {
    await this.page.waitForSelector('div.store-img');
    await expect(await this.page.locator('.input-checkbox span.checkbox-label').getByText(category)).toBeVisible();
    await this.page.locator('.input-checkbox span.checkbox-label').getByText(category).click();
    await this.page.waitForSelector('div.store-img');
  }
}