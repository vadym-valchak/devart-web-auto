import { Locator, Page, expect } from '@playwright/test';

export class MenuDataConnectivityWebsiteSection {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async menuItem(productName: string) {
    await this.page
      .locator('.dropdown-menu-content-list__title')
      .getByText(productName)
      .click({ position: { x: 0, y: 0 } });
  }
}
