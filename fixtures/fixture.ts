import { test as base } from '@playwright/test';
import { SignInPage } from '../projects/signIn.page';
import { SignUpPage } from '../projects/signUp.page';
import { HomeWebsitePage } from '../projects/website/pages/homeWebsite.page';
import { ProductsWebsitePage } from '../projects/website/pages/productsWebsite.page';
import { ProductDetailsWebsitePage } from '../projects/website/pages/productDetailsWebsite.page';
import { DownloadProductWebsitePage } from '../projects/website/pages/downloadProductWebsite.page';
import { PurchasedProductsCustomerPortalPage } from '../projects/customer_portal/pages/purchasedProductsCustomerPortal.page';
import { LicenseDetailsCustomerPortalPage } from '../projects/customer_portal/pages/licenseDetailsCustomerPortal.page';
import { DownloadProductsCustomerPortalPage } from '../projects/customer_portal/pages/downloadProductsCustomerPortal.page';
import { ProfilePersonalInformationCustomerPortalPage } from '../projects/customer_portal/pages/profilePersonalInformatioCustomerPortal.page';
import { ProfileSecureInformationCustomerPortalPage } from '../projects/customer_portal/pages/profileSecureInformatioCustomerPortal.page';
import { ProfileDeleteCustomerPortalPage } from '../projects/customer_portal/pages/profileDeleteProfileCustomerPortal.page';
('../projects/customer_portal/page/ProfileDeleteCustomerPortalPage');
import { PricingOptionsPage } from '../projects/website/pages/pricingOptions.page';
import { ShoppingCartDropdownWebsitePage } from '../projects/website/pages/shoppingCartDropdownWebsite.page';

export interface TestOptions {
  signInPage: SignInPage;
  signUpPage: SignUpPage;
  homeWebsitePage: HomeWebsitePage;
  productsWebsitePage: ProductsWebsitePage;
  productDetailsWebsitePage: ProductDetailsWebsitePage;
  downloadProductWebsitePage: DownloadProductWebsitePage;
  purchasedProductsCustomerPortalPage: PurchasedProductsCustomerPortalPage;
  licenseDetailsCustomerPortalPage: LicenseDetailsCustomerPortalPage;
  downloadProductsCustomerPortalPage: DownloadProductsCustomerPortalPage;
  profilePersonalInformationCustomerPortalPage: ProfilePersonalInformationCustomerPortalPage;
  profileSecureInformationCustomerPortalPage: ProfileSecureInformationCustomerPortalPage;
  profileDeleteCustomerPortalPage: ProfileDeleteCustomerPortalPage;
  pricingOptionsPage: PricingOptionsPage;
  shoppingCartDropdownWebsitePage: ShoppingCartDropdownWebsitePage;
}

export const test = base.extend<TestOptions>({
  signInPage: async ({ page }, use) => await use(new SignInPage(page)),
  signUpPage: async ({ page }, use) => await use(new SignUpPage(page)),
  homeWebsitePage: async ({ page }, use) => await use(new HomeWebsitePage(page)),
  productsWebsitePage: async ({ page }, use) => await use(new ProductsWebsitePage(page)),
  productDetailsWebsitePage: async ({ page }, use) => await use(new ProductDetailsWebsitePage(page)),
  downloadProductWebsitePage: async ({ page }, use) => await use(new DownloadProductWebsitePage(page)),
  purchasedProductsCustomerPortalPage: async ({ page }, use) =>
    await use(new PurchasedProductsCustomerPortalPage(page)),
  licenseDetailsCustomerPortalPage: async ({ page }, use) => await use(new LicenseDetailsCustomerPortalPage(page)),
  downloadProductsCustomerPortalPage: async ({ page }, use) => await use(new DownloadProductsCustomerPortalPage(page)),
  profilePersonalInformationCustomerPortalPage: async ({ page }, use) =>
    await use(new ProfilePersonalInformationCustomerPortalPage(page)),
  profileSecureInformationCustomerPortalPage: async ({ page }, use) =>
    await use(new ProfileSecureInformationCustomerPortalPage(page)),
  profileDeleteCustomerPortalPage: async ({ page }, use) => await use(new ProfileDeleteCustomerPortalPage(page)),
  pricingOptionsPage: async ({ page }, use) => await use(new PricingOptionsPage(page)),
  shoppingCartDropdownWebsitePage: async ({ page }, use) => await use(new ShoppingCartDropdownWebsitePage(page)),
});
