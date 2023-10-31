import { Page } from '@playwright/test';
import { HeaderWebsiteSection } from '../sections/headerWebsite.section';
import { MenuHeaderWebsiteSection } from '../sections/menuHeaderWebsite.section';
import { MenuProductsWebsiteSection } from '../sections/menu/menuProductsWebsite.section';
import { BasePage } from './base.page';

export class HomeWebsitePage extends BasePage {
  readonly page: Page;
  private readonly headerWebsiteSection: HeaderWebsiteSection;
  private readonly menuHeaderWebsiteSection: MenuHeaderWebsiteSection;
  private readonly menuProductsWebsiteSection: MenuProductsWebsiteSection;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.headerWebsiteSection = new HeaderWebsiteSection(page);
    this.menuHeaderWebsiteSection = new MenuHeaderWebsiteSection(page);
    this.menuProductsWebsiteSection = new MenuProductsWebsiteSection(page);
  }

  async open() {
    await this.page.goto('https://www.devart.com/');
  }

  async openSignInPage() {
    await this.headerWebsiteSection.openMobileMenu();
    await this.headerWebsiteSection.customerHeaderWebsiteSection.openSignInPage();
  }

  async openProductsMenu() {
    await this.headerWebsiteSection.openMobileMenu();
    await this.menuHeaderWebsiteSection.openProductsMenuItem();
    return await this.menuProductsWebsiteSection;
  }

  async openCartDropdown() {
    await this.headerWebsiteSection.openMobileMenu();
    await this.headerWebsiteSection.cartHeaderWebsiteSection.openCartDropdown();
  }
}
