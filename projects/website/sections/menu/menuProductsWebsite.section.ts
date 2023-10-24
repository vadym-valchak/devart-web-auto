import { Locator, Page, expect } from '@playwright/test';
import { MenuDatabaseToolsWebsiteSection } from './menuDatabaseToolsWebsite.section';
import { MenuDataConnectivityWebsiteSection } from './menuDataConnectivityWebsite.section';
import { MenuCloudDataToolsWebsiteSection } from './menuDataCloudDataToolsWebsite.section';
import { MenuProductivityToolsWebsiteSection } from './menuProductivityToolsWebsite.section';

export class MenuProductsWebsiteSection {
  private readonly page: Page;
  private readonly menuDatabaseToolsWebsiteSection: MenuDatabaseToolsWebsiteSection;
  private readonly menuDataConnectivityWebsiteSection: MenuDataConnectivityWebsiteSection;
  private readonly menuCloudDataToolsWebsiteSection: MenuCloudDataToolsWebsiteSection;
  private readonly menuProductivityToolsWebsiteSection: MenuProductivityToolsWebsiteSection;
  readonly databaseToolsMenuItem: Locator;
  private readonly dataConnectivityMenuItem: Locator;
  private readonly cloudDataToolsMenuItem: Locator;
  private readonly productivityToolsMenuItem: Locator;
  private readonly productFinderMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuDatabaseToolsWebsiteSection = new MenuDatabaseToolsWebsiteSection(page);
    this.menuDataConnectivityWebsiteSection = new MenuDataConnectivityWebsiteSection(page);
    this.menuCloudDataToolsWebsiteSection = new MenuCloudDataToolsWebsiteSection(page);
    this.menuProductivityToolsWebsiteSection = new MenuProductivityToolsWebsiteSection(page);
    this.databaseToolsMenuItem = page.locator('.dropdown-menu-sidebar__title-icon span').getByText('Database Tools');
    this.dataConnectivityMenuItem = page
      .locator('.dropdown-menu-sidebar__title-icon span')
      .getByText('Data connectivity');
    this.cloudDataToolsMenuItem = page
      .locator('..dropdown-menu-sidebar__title-icon span')
      .getByText('Cloud Data Tools');
    this.productivityToolsMenuItem = page
      .locator('.dropdown-menu-sidebar__title-icon span')
      .getByText('Productivity Tools');
    this.productFinderMenuItem = page.locator('span').getByText('Product finder');
  }

  async openDatabaseToolsMenuItem() {
    await this.databaseToolsMenuItem.click();
    return this.menuDatabaseToolsWebsiteSection;
  }

  async openDataConnectivityMenuItem() {
    await this.dataConnectivityMenuItem.click();
    return this.menuDataConnectivityWebsiteSection;
  }

  async openCloudDataToolsMenuItem() {
    await this.cloudDataToolsMenuItem.click();
    return this.menuCloudDataToolsWebsiteSection;
  }

  async openProductivityToolsMenuItem() {
    await this.productivityToolsMenuItem.click();
    return this.menuProductivityToolsWebsiteSection;
  }

  async openProductFinderMunuItem() {
    await this.productFinderMenuItem.click();
  }
}
