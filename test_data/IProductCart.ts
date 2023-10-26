import { PurchaseType, Edition, Currency } from './parameters.enum';

export interface IProductCartModel {
  name: string;
  edition: Edition;
  purchaseType?: PurchaseType;
  period: number;
  unitPrice: number;
  currency: Currency;
  quontity: number;
  prioritySupport: boolean;
}