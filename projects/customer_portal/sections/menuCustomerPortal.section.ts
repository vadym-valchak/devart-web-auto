import { Locator, Page } from '@playwright/test';

export class MenuCustomerPortalSection {
  protected readonly page: Page;
  protected readonly spinner: Locator;
  protected readonly exitIcon: Locator;
  protected readonly storeButton: Locator;
  protected readonly menuProfile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.exitIcon = page.getByText('login');
    this.spinner = page.locator('.lds-roller');
    this.storeButton = page.locator('a.btn').getByText('store');
    this.menuProfile = page.locator('.menu-item').getByText('Profile');
  }

  async openStore() {
    await this.storeButton.click();
  }

  async openProfilePage() {
    await this.menuProfile.click();
  }

  async logout() {
    await this.exitIcon.click();
  }
}
