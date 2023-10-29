import { PurchaseType, Edition, DurationEnum } from '../parameters.enum';

export interface IProductCartModel {
  name: string;
  edition: Edition;
  purchaseType?: PurchaseType | null;
  duration: DurationEnum;
  unitPrice: IPrice | null;
  totalPrice: IPrice | null;
  quantity: number;
  prioritySupport: boolean;

  setPrice(priceObject: IPricesList);
}

export interface IPrice {
  price: number | null;
  currency: string;
}

export interface IPricesList {
  unitPrice: IPrice;
  totalPrice: IPrice;
}
