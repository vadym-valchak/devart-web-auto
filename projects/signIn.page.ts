import { expect, Locator, Page } from '@playwright/test';

export class SignInPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator("form[id='login'] #Email");
    this.passwordField = page.locator('#Password');
    this.signInButton = page.locator("button[value='login']");
    this.signUpLink = page.locator("a[href='#create-account-tab']");
  }

  async checkPageElements() {
    await expect(this.emailField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async login(email: string, password: string) {
    const emailAttribute = await this.emailField.getAttribute('readonly');
    if (emailAttribute != 'readonly') {
      await this.emailField.fill(email);
    }
    await this.passwordField.fill(password);
    await this.signInButton.click();
  }

  async openSignUpForm() {
    await expect(this.signUpLink).toBeVisible();
    await this.page.waitForTimeout(2000);
    await this.signUpLink.click();
  }

  async checkInvalidLoginPasswordWarningIsDisplayed() {
    await expect(this.page.locator('.tab-pane#login')).toContainText('Invalid username or password');
  }
}
