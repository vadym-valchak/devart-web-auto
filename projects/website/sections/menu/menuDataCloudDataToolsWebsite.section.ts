import { Locator, Page, expect } from '@playwright/test';

export class MenuCloudDataToolsWebsiteSection {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
