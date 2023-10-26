import { Locator, Page, expect } from '@playwright/test';
import { IProductCartModel } from '../../../test_data/IProductCart';

export class ShoppingCartDropdownWebsitePage {
  private readonly page: Page;
  private readonly productsList: Promise<Locator[]>;

  constructor(page: Page) {
    this.page = page;
    this.productsList = this.page.locator('.dropdown-shopping-cart-row').all();
  }

  async getProductDetail(rowLocator: Locator) {
    const name = await this.getName(rowLocator);
    const edition = await this.getEdition(rowLocator);
    const purchaseType = await this.getPurchaseType(rowLocator);
    const duration = await this.getDuration(rowLocator);
    const price = await this.getPrice(rowLocator);
    const quontity = await this.getQuontity(rowLocator);
    const prioritySupport = await this.getPrioritySupport(rowLocator);
    
  }

  private async getName(productRow: Locator) {
    return await productRow.locator('.link').innerText();
  }

  private async getEdition(productRow: Locator) {
    return await productRow.locator('.edition').innerText();
  }

  private async getPurchaseType(productRow: Locator) {
    return await productRow.locator('.sales-model').innerText();
  }

  private async getDuration(productRow: Locator): Promise<number> {
    const value = (Number) ((await productRow.locator('.subscription').innerText()).trim().split(' ')[0]);
    return value;
  }

  private async getPrice(productRow: Locator): Promise<number> {
    const valuePrice = (Number) (await productRow.locator('.unit-price').innerText());
    return valuePrice;
  }

  private async getQuontity(productRow: Locator): Promise<number> {
    const value = (Number)( await productRow.locator('.qty').innerText());
    return value;
  }

  private async getPrioritySupport(productRow: Locator): Promise<boolean> {
    const value =  await productRow.locator('.priority-support').innerText();
    if(value === 'included') {
      return true;
    }
    return false;
  }
}
