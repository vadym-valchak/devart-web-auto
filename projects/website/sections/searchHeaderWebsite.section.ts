import { Locator, Page, expect } from '@playwright/test';

export class SearchHeaderWebsiteSection {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
