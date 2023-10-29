import { IPrice } from './ICartProducts.model';

export class Price implements IPrice {
  price: number;
  currency: string;

  constructor(price: number, currency: string) {
    this.price = price;
    this.currency = currency;
  }
}
