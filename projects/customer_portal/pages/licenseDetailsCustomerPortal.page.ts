import { Locator, Page, expect } from '@playwright/test';
import { MenuCustomerPortalSection } from '../sections/menuCustomerPortal.section';

export class LicenseDetailsCustomerPortalPage extends MenuCustomerPortalSection {
  protected readonly page: Page;
  private readonly assignLicenseInputField: Locator;
  private readonly assignButton: Locator;
  private readonly revokeButton: Locator;
  private readonly cancelInvitationButton: Locator;
  private readonly downloadButton: Locator;
  private readonly licenseOwner: Locator;
  private readonly licenseAdmin: Locator;
  private readonly emailSentSnackbar: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.assignLicenseInputField = page.locator("[formcontrolname='email']");
    this.assignButton = page.getByRole('button', { name: 'Assign' });
    this.revokeButton = page.getByRole('button', { name: 'Revoke' });
    this.cancelInvitationButton = page.getByRole('button', {
      name: 'Cancel invitation',
    });
    this.downloadButton = page.getByText('Download product versions');
    this.licenseOwner = page.locator('div.email-licenses').first();
    this.licenseAdmin = page.locator('div.email-licenses').nth(1);
    this.emailSentSnackbar = page.locator('.emailsent-snackbar-message');
  }

  async assignLicenseTo(email: string) {
    await this.page.waitForTimeout(2000);

    if (await this.revokeButton.isVisible()) {
      await this.revokeButton.click();
      await await expect.soft(this.spinner).toBeHidden();
    }
    if (await this.cancelInvitationButton.isVisible()) {
      await this.cancelInvitationButton.click();
      await await expect.soft(this.spinner).toBeHidden();
    }
    await expect(this.assignLicenseInputField).toBeVisible();
    await this.assignLicenseInputField.fill(email);
    await this.assignButton.isEnabled();
    await this.assignButton.click();
    await await expect.soft(this.spinner).toBeHidden();
    await await expect.soft(this.assignButton).toBeHidden();
  }

  async revokeLicense() {
    await this.revokeButton.click();
    await expect.soft(this.spinner).toBeHidden();
  }

  async checkRevokeButtonIsHidden() {
    await expect(this.revokeButton).toBeHidden();
  }

  async openDownalodProductPage() {
    await this.downloadButton.click();
  }

  async checkLicenseOwnerIsDisplayed(licenseOwnerValue: string) {
    await expect.soft(this.licenseOwner).toContainText(licenseOwnerValue);
  }

  async checkLicenseAdminIsAssigned(licenseAdminValue: string) {
    await expect.soft(this.licenseAdmin).toContainText(licenseAdminValue);
  }

  async checkLicenseAdminIsNotAssigned() {
    await expect.soft(this.licenseAdmin).toContainText('Not assigned');
  }

  async checkInvitationSnackbar() {
    await expect.soft(this.emailSentSnackbar.getByText('The invitation has been sent successfully')).toBeVisible();
    await expect.soft(this.emailSentSnackbar.getByText('The invitation has been sent successfully')).toBeHidden();
  }

  async checkLicenseRevokedSnackbar() {
    await expect
      .soft(this.emailSentSnackbar.getByText('The license assignment has been revoked successfully'))
      .toBeVisible();
    await expect
      .soft(this.emailSentSnackbar.getByText('The license assignment has been revoked successfully'))
      .toBeHidden();
  }
}
