import { Locator, Page, expect } from '@playwright/test';
import { MenuCustomerPortalSection } from '../sections/menuCustomerPortal.section';

export class ProfilePersonalInformationCustomerPortalPage extends MenuCustomerPortalSection {
  protected readonly page: Page;
  private readonly emptyPageQuote: Locator;
  private readonly securetyInformationPage: Locator;
  private readonly deleteProfilePage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.emptyPageQuote = this.page.locator('h4.quotes-title');
    this.securetyInformationPage = this.page.locator('.mat-tab-label-content').getByText('Security information');
    this.deleteProfilePage = this.page.locator('.mat-tab-label-content').getByText('Delete profile');
  }

  async openSecureInformationPage() {
    await this.securetyInformationPage.click();
  }

  async openDeleteProfileTab() {
    await this.deleteProfilePage.click();
  }
}
