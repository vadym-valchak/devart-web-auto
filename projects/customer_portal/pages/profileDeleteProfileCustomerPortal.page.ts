import { Locator, Page, expect } from '@playwright/test';
import { MenuCustomerPortalSection } from '../sections/menuCustomerPortal.section';

export class ProfileDeleteCustomerPortalPage extends MenuCustomerPortalSection {
  protected readonly page: Page;
  private readonly deleteButton: Locator;
  private readonly confirmEmailSnackbar: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.deleteButton = page.locator('button').getByText('Delete');
    this.confirmEmailSnackbar = page
      .locator('.emailsent-snackbar-message')
      .getByText(' The confirmation email has been sent to your email successfully.');
  }

  async deleteProfile() {
    await this.deleteButton.click();
  }

  async checkConfirmEmailIsShown() {
    await expect.soft(this.confirmEmailSnackbar).toBeVisible();
    await expect.soft(this.confirmEmailSnackbar).toBeHidden();
  }
}
