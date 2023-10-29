import { Locator, Page, expect } from '@playwright/test';
import { DurationEnum, Edition, Purchase } from '../../../test_data/parameters.enum';
import { Price } from '../../../test_data/models/price';
import { IPricesList, IProductCartModel } from '../../../test_data/models/ICartProducts.model';
import { has } from 'cheerio/lib/api/traversing';

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

  async addDbForgeProductToCart(
    edition: Edition,
    purchaseType: Purchase,
    duration: DurationEnum,
    prioritySuport: boolean,
    quontity: number,
  ) {
    await this.setPurchaseType(purchaseType);
    await this.setDuration(duration);
    // need to add checkbox action
    await this.setQuontity(quontity);
    return await this.clickAddToCartButtonAndGetPriceObject(edition);
  }

  private async setQuontity(quontity: number) {
    for (let i = 1; i < quontity; i++) {
      await this.plusQuontityIcon.click();
    }
  }

  private async setPurchaseType(purchaseType: Purchase) {
    await this.page.locator('.saas-button__text').getByText(purchaseType).click();
  }

  private async setDuration(duration: DurationEnum) {
    await this.page.locator('.slider-horizontal').click({ position: { x: duration, y: 0 } });
  }

  async checkProductAddedToCartSnackbar() {
    await expect(this.productAddedToCartSnackbar).toBeVisible();
    await expect(this.productAddedToCartSnackbar).toBeHidden();
  }

  private async clickAddToCartButtonAndGetPriceObject(edition: Edition): Promise<IPricesList> {
    const [response] = await Promise.all([
      this.page.waitForResponse(res => res.url().includes('/api/cart')),
      this.page
        .locator('.pricing-box-inner', { has: this.page.locator('.pricing-head').getByText(`${edition}`) })
        .locator('.btn-add_cart')
        .click(),
    ]);
    //Get price of product from API response
    const unitPrice = (await response.json()).shoppingCartItems[0].basePrice;
    const unitPriceCurrency = (await response.json()).shoppingCartItems[0].basePriceString;
    const totalPrice = (await response.json()).shoppingCartItems[0].subtotal;
    const totalPriceCurrency = (await response.json()).shoppingCartItems[0].subtotalString;
    return {
      unitPrice: new Price(unitPrice, unitPriceCurrency),
      totalPrice: new Price(totalPrice, totalPriceCurrency),
    };
  }
}
