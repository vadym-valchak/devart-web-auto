import { Locator, Page, expect } from '@playwright/test';
import { CartHeaderWebsiteSection } from './cartHeaderWebsite.section';
import { CustomerHeaderWebsiteSection } from './customerHeaderWebsite.section';
import { LanguageHeaderWebsiteSection } from './languageHeaderWebsite.section';
import { MenuHeaderWebsiteSection } from './menuHeaderWebsite.section';
import { SearchHeaderWebsiteSection } from './searchHeaderWebsite.section';

export class HeaderWebsiteSection {
  readonly cartHeaderWebsiteSection: CartHeaderWebsiteSection;
  readonly customerHeaderWebsiteSection: CustomerHeaderWebsiteSection;
  readonly languageHeaderWebsiteSection: LanguageHeaderWebsiteSection;
  readonly menuHeaderWebsiteSection: MenuHeaderWebsiteSection;
  readonly searchHeaderWebsiteSection: SearchHeaderWebsiteSection;
  private readonly page: Page;
  private readonly toggleNavMenuIcon: Locator;

  constructor(page: Page) {
    this.cartHeaderWebsiteSection = new CartHeaderWebsiteSection(page);
    this.customerHeaderWebsiteSection = new CustomerHeaderWebsiteSection(page);
    this.languageHeaderWebsiteSection = new LanguageHeaderWebsiteSection(page);
    this.menuHeaderWebsiteSection = new MenuHeaderWebsiteSection(page);
    this.searchHeaderWebsiteSection = new SearchHeaderWebsiteSection(page);
    this.toggleNavMenuIcon = page.locator('.toggle-btn');
  }

  async openMobileMenu() {
    await this.toggleNavMenuIcon.click();
  }
}
