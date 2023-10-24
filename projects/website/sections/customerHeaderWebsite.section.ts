import { Locator, Page, expect } from '@playwright/test';

export class CustomerHeaderWebsiteSection {
  private readonly page: Page;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = this.page.locator('.menu-list-login a[class*=login-link]');
  }

  async openSignInPage() {
    await this.signInButton.click();
  }
}
