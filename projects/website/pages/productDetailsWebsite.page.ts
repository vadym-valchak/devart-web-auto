import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsWebsitePage extends BasePage {
  readonly page: Page;
  private readonly downloadButtonOnBunner: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.downloadButtonOnBunner = page.locator('.banner-group-btn').getByText('Download');
  }

  async clickDownloadButton() {
    await this.downloadButtonOnBunner.click();
  }

  async clickBuyNowButton() {
    await this.page.locator('.banner-btn').getByText('Buy now').click();
  }

  async filterProductsByCategory(category: string) {
    await this.page.waitForSelector('div.store-img');
    await expect(await this.page.locator('.input-checkbox span.checkbox-label').getByText(category)).toBeVisible();
    await this.page.locator('.input-checkbox span.checkbox-label').getByText('Data connectivity').click();
    await this.page.waitForSelector('div.store-img');
  }
}
