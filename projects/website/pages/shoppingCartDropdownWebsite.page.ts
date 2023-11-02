import { Locator, Page } from '@playwright/test';
import { ProductCart } from '../../../test_data/models/productCart';
import { PurchaseType, Edition } from '../../../test_data/parameters.enum';
import { IProductCartModel as ICartProductsModel, IPrice } from '../../../test_data/models/ICartProducts.model';
import { Price } from '../../../test_data/models/price';
import { BasePage } from './base.page';

export class ShoppingCartDropdownWebsitePage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async getProductsList() {
    await this.page.waitForTimeout(2 * 1000);
    const products: ICartProductsModel[] = [];
    const productsList = await this.page.locator('.dropdown-cart .table-shopping-cart').locator('tr').all();
    for (const productLocator of productsList) {
      products.push(await this.getProductDetail(productLocator));
    }
    return products;
  }

  async getProductDetail(rowLocator: Locator) {
    const name = await this.getName(rowLocator);
    const edition = await this.getEdition(rowLocator);
    const purchaseType = await this.getPurchaseType(rowLocator);
    const duration = await this.getDuration(rowLocator);
    const unitPrice = await this.getUnitPrice(rowLocator);
    const totalPrice = await this.getTotalPrice(rowLocator);
    const quantity = await this.getQuantity(rowLocator);
    const prioritySupport = await this.getPrioritySupport(rowLocator);

    return await new ProductCart(
      name,
      edition,
      duration,
      unitPrice,
      totalPrice,
      quantity,
      prioritySupport,
      purchaseType,
    );
  }

  private async getName(productRow: Locator) {
    const value = await productRow.locator('.link a').textContent();
    return value;
  }

  private async getEdition(productRow: Locator) {
    const value = (await productRow.locator('.edition').innerText())?.split(' ').pop();
    switch (value) {
      case Edition.Standard: {
        return Edition.Standard;
      }
      case Edition.Professional: {
        return Edition.Professional;
      }
      case Edition.Enterprise: {
        return Edition.Enterprise;
      }
      case Edition.Developer: {
        return Edition.Developer;
      }
    }
  }

  private async getPurchaseType(productRow: Locator) {
    if (await productRow.locator('.sales-model').isVisible()) {
      let value = await productRow
        .locator('.sales-model')
        .innerText()
        .catch(() => null);
      value = value?.split(' ').pop();
      switch (value) {
        case PurchaseType.Single: {
          return PurchaseType.Single;
        }
        case PurchaseType.Perpetual: {
          return PurchaseType.Perpetual;
        }
        case PurchaseType.Subscription: {
          return PurchaseType.Subscription;
        }
        case PurchaseType.Team: {
          return PurchaseType.Team;
        }
      }
    } else {
      return null;
    }
  }

  private async getDuration(productRow: Locator) {
    const value = (await productRow.locator('.subscription').innerText())?.split(' ').slice(-2).join(' ');
    return value;
  }

  private async getUnitPrice(productRow: Locator): Promise<IPrice> {
    const value = await productRow.locator('.unit-price');
    const price = Number((await value.innerText())?.split(' ').pop()?.slice(1).replace(',', ''));
    const currency = (await value.innerText())?.split(' ').pop()?.slice(0, 1);
    return new Price(price, currency);
  }

  private async getTotalPrice(productRow: Locator): Promise<IPrice> {
    const value = await productRow.locator('.dropdown-shopping-cart__price');
    const price = Number((await value.innerText())?.split(' ').pop()?.slice(1).replace(',', ''));
    const currency = (await value.innerText())?.split(' ').pop()?.slice(0, 1);
    return new Price(price, currency);
  }

  private async getQuantity(productRow: Locator) {
    const value = Number((await productRow.locator('.qty').innerText())?.trim().split(' ').pop());
    return value;
  }

  private async getPrioritySupport(productRow: Locator) {
    const value = (await productRow.locator('.priority-support').innerText())?.split(' ').pop();
    if (value === 'Included') {
      return true;
    }
    return false;
  }

  async checkCartProducts(a1: ICartProductsModel[], a2: ICartProductsModel[]) {
    return a1.length === a2.length && a1.every((o, idx) => this.objectsEqual(o, a2[idx]));
  }

  objectsEqual(o1, o2) {
    Object.keys(o1).length > 0
      ? Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every(p => this.objectsEqual(o1[p], o2[p]))
      : o1 === o2;
  }
}
