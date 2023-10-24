import { Locator, Page, expect } from '@playwright/test';

export class MenuProductivityToolsWebsiteSection {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
