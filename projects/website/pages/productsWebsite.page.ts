import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsWebsitePage extends BasePage {
  readonly page: Page;
  private readonly productAddedToCartSnackbar: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.productAddedToCartSnackbar = page.locator('.show-snackbar');
  }

  async filterProductsByCategory(categoryName: string) {
    await this.page.waitForSelector('div.store-img');
    await expect(await this.page.locator('.input-checkbox span.checkbox-label').getByText(categoryName)).toBeVisible();
    await this.page.locator('.input-checkbox span.checkbox-label').getByText(categoryName).click();
    await this.page.waitForSelector('div.store-img');
  }

  async doNotFilterProductsByCategory(categoryName: string) {
    await this.filterProductsByCategory(categoryName);
  }

  async clickViewPricingOptionsForProduct(productName: string) {
    await this.page
      .locator('.store-products-box', { has: this.page.locator('.all-product-title a').getByText(`${productName}`) })
      .locator('.view-pricing-options a')
      .click();
  }

  async clickDownloadButtonForProduct(productName: string) {
    await this.page
      .locator('.store-products-box', { has: this.page.locator('.all-product-title a').getByText(`${productName}`) })
      .getByText('Download')
      .click();
  }

  async waitForPageIsLoaded() {
    await this.page.waitForSelector('div.store-img');
  }

  async checkProductAddedToCartSnackbar() {
    await expect(this.productAddedToCartSnackbar).toBeVisible();
    await expect(this.productAddedToCartSnackbar).toBeHidden();
  }

  async addSingleProductToCart(productName: string) {
    await this.page
      .locator('.store-products-box', { has: this.page.locator('.all-product-title a').getByText(`${productName}`) })
      .locator('.devart-tooltip')
      .click();
  }

  async openProductDetails(productName: string) {
    await this.page.locator('a[href="universal-bundle/"]').getByText(productName).click();
  }
}
