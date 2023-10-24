import { Locator, Page, expect } from '@playwright/test';
import { MenuCustomerPortalSection } from '../sections/menuCustomerPortal.section';

export class PurchasedProductsCustomerPortalPage extends MenuCustomerPortalSection {
  protected readonly page: Page;
  private readonly emptyPageQuote: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.emptyPageQuote = this.page.locator('h4.quotes-title');
  }

  async openLicenseDetails(productName: string) {
    await this.page.getByText(productName).first().click();
  }

  async checkThatEmptyPageIsShown() {
    await expect(this.emptyPageQuote).toHaveText('There are no product licenses associated with your account');
  }
}
