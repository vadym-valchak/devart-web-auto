import { Locator, Page, expect } from '@playwright/test';
import { MenuCustomerPortalSection } from '../sections/menuCustomerPortal.section';

export class ProfileSecureInformationCustomerPortalPage extends MenuCustomerPortalSection {
  protected readonly page: Page;
  private readonly emptyPageQuote: Locator;
  private readonly currentPasswordInputField: Locator;
  private readonly passwordInputField: Locator;
  private readonly confirmPasswordInputField: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.currentPasswordInputField = this.page.locator("[controlname='currentPassword'] input");
    this.passwordInputField = this.page.locator("[controlname='newPassword'] input");
    this.confirmPasswordInputField = this.page.locator("[controlname='confirmNewPassword'] input");
    this.saveButton = page.locator("button[type='submit']").getByText('Save');
  }

  async changePassword(currentPassword: string, password: string, confirmPassword: string) {
    await this.currentPasswordInputField.fill(currentPassword);
    await this.passwordInputField.fill(password);
    await this.confirmPasswordInputField.fill(confirmPassword);
    await this.saveButton.click();
  }
}
