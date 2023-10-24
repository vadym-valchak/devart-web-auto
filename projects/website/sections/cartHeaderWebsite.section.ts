import { Locator, Page, expect } from '@playwright/test';

export class CartHeaderWebsiteSection {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
