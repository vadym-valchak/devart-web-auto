import { Locator, Page, expect } from '@playwright/test';
import { MenuProductsWebsiteSection } from './menu/menuProductsWebsite.section';

export class MenuHeaderWebsiteSection {
  private readonly page: Page;
  private readonly menuProductsWebsiteSection: MenuProductsWebsiteSection;

  private readonly productsMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuProductsWebsiteSection = new MenuProductsWebsiteSection(page);

    this.productsMenuItem = page.locator('.menu-list-link').getByText('Products');
  }

  async openProductsMenuItem() {
    await this.productsMenuItem.click();
    return this.menuProductsWebsiteSection;
  }
}
