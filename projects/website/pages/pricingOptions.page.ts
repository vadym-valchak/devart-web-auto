import { Locator, Page, expect } from '@playwright/test';
import { DurationEnum, PurchaseType } from '../../../test_data/parameters.enum';

export class PricingOptionsPage {
  private readonly page: Page;
  private readonly plusQuontityIcon: Locator;
  private readonly productAddedToCartSnackbar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.plusQuontityIcon = page.locator("button[data-type='plus']");
    this.productAddedToCartSnackbar = page.locator('.show-snackbar');
  }

  async setProductParametersSSIS(duration: DurationEnum, prioritySuport: boolean, quontity: number) {
    await this.setDuration(duration);
    // need to add checkbox action
    await this.setQuontity(quontity);
  }

  async setProductParametersDbForge(
    purchaseType: PurchaseType,
    duration: DurationEnum,
    prioritySuport: boolean,
    quontity: number,
  ) {
    await this.page.locator('.saas-button__text').getByText(purchaseType).click();
    await this.setDuration(duration);
    // need to add checkbox action
    await this.setQuontity(quontity);
  }

  private async setQuontity(quontity: number) {
    for (let i = 1; i < quontity; i++) {
      await this.plusQuontityIcon.click();
    }
  }

  private async setDuration(duration: DurationEnum) {
    await this.page.locator('.slider-horizontal').click({ position: { x: duration, y: 0 } });
  }

  async checkProductAddedToCartSnackbar() {
    await expect(this.productAddedToCartSnackbar).toBeVisible();
    await expect(this.productAddedToCartSnackbar).toBeHidden();
  }
}
