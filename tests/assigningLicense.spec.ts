import { test } from './../fixtures/fixture';
import { mailHelper } from '../helpers/mail.helper';
import { expect } from '@playwright/test';
import { DurationEnum, Edition, PurchaseType } from '../test_data/parameters.enum';
import { users } from '../test_data/users';
import { IProductCartModel } from '../test_data/models/ICartProducts.model';
import { ProductCart } from '../test_data/models/productCart';

const licenseOwner = users.licenseOwner;
const licenseAdmin = users.licenseAdmin;

test('AUT-001: Check assigning and revoking license', async ({
  page,
  signInPage,
  homeWebsitePage,
  purchasedProductsCustomerPortalPage,
  licenseDetailsCustomerPortalPage,
}) => {
  const productName = 'dbForge SQL Tools';

  await homeWebsitePage.open();
  await homeWebsitePage.openSignInPage();
  await signInPage.checkPageElements();
  await signInPage.login(licenseOwner.email, licenseOwner.password);
  await purchasedProductsCustomerPortalPage.openLicenseDetails(productName);
  // Check owner and assigned user emails
  await licenseDetailsCustomerPortalPage.checkLicenseOwnerIsDisplayed(licenseOwner.email);
  await licenseDetailsCustomerPortalPage.checkLicenseAdminIsNotAssigned();
  // Assign license
  await licenseDetailsCustomerPortalPage.assignLicenseTo(licenseAdmin.email);
  //Check snackbar is shown.
  await licenseDetailsCustomerPortalPage.checkInvitationSnackbar();
  await licenseDetailsCustomerPortalPage.logout();
  // Read email and navigate on link in email
  const emailHTML = await mailHelper.readEmail(
    page,
    'website@devart.com',
    licenseAdmin.email,
    'dbForge SQL Tools license has been assigned to you',
  );
  const verificationCodeFromEmail = await mailHelper.getJoinYourTeamLink(emailHTML);
  await page.goto(verificationCodeFromEmail);
  await signInPage.login(licenseAdmin.email, licenseAdmin.password);
  await purchasedProductsCustomerPortalPage.openLicenseDetails(productName);
  // Check owner and assigned user emails
  await licenseDetailsCustomerPortalPage.checkLicenseOwnerIsDisplayed(licenseOwner.email);
  await licenseDetailsCustomerPortalPage.checkLicenseAdminIsAssigned(licenseAdmin.email);

  await licenseDetailsCustomerPortalPage.logout();
  await homeWebsitePage.openSignInPage();
  await signInPage.login(licenseOwner.email, licenseOwner.password);
  await purchasedProductsCustomerPortalPage.openLicenseDetails(productName);
  await licenseDetailsCustomerPortalPage.revokeLicense();
  await licenseDetailsCustomerPortalPage.checkRevokeButtonIsHidden();
  //Check snackbar is shown.
  await licenseDetailsCustomerPortalPage.checkLicenseRevokedSnackbar();
  // Check owner and assigned user emails
  await licenseDetailsCustomerPortalPage.checkLicenseOwnerIsDisplayed(licenseOwner.email);
  await licenseDetailsCustomerPortalPage.checkLicenseAdminIsNotAssigned();
  await licenseDetailsCustomerPortalPage.logout();
  await homeWebsitePage.openSignInPage();
  await signInPage.login(licenseAdmin.email, licenseAdmin.password);
  await purchasedProductsCustomerPortalPage.checkThatEmptyPageIsShown();
});

test('AUT-02: Check downloading product in Customer Portal', async ({
  signInPage,
  homeWebsitePage,
  purchasedProductsCustomerPortalPage,
  licenseDetailsCustomerPortalPage,
  downloadProductsCustomerPortalPage,
}) => {
  const productName = 'dotConnect for Oracle';

  await homeWebsitePage.open();
  await homeWebsitePage.openSignInPage();
  await signInPage.login(licenseOwner.email, licenseOwner.password);
  await purchasedProductsCustomerPortalPage.openLicenseDetails(productName);
  await licenseDetailsCustomerPortalPage.openDownalodProductPage();
  await downloadProductsCustomerPortalPage.downloadAndCheckLatestProduct();
});

test('AUT-03: Check downloading trial product in website by unauthorized user', async ({
  signInPage,
  signUpPage,
  homeWebsitePage,
  productDetailsWebsitePage: productWebsitePage,
  downloadProductWebsitePage,
}) => {
  await homeWebsitePage.open();
  // Navigate to Product through Main Menu
  await (await (await homeWebsitePage.openProductsMenu()).openDatabaseToolsMenuItem()).menuItem('SQL Complete');
  // Download trial version product
  await productWebsitePage.openDownloadPage();
  await downloadProductWebsitePage.downloadProductBuild(0);
  await signUpPage.openSignInPage();
  await signInPage.login(licenseOwner.email, licenseOwner.password);
  await downloadProductWebsitePage.downloadAndCheckFileIsDownloaded(0);
});

test('AUT-04: Check downloading product Data Connectivity in Store', async ({
  signInPage,
  purchasedProductsCustomerPortalPage,
  homeWebsitePage,
  productsWebsitePage,
  downloadProductWebsitePage,
}) => {
  await homeWebsitePage.open();
  await homeWebsitePage.openSignInPage();
  await signInPage.login(licenseOwner.email, licenseOwner.password);
  await purchasedProductsCustomerPortalPage.openStore();
  // Filter products
  await productsWebsitePage.filterProductsByCategory('Data connectivity');
  // Click download for product 'dotConnect for Oracle'
  await productsWebsitePage.clickDownloadButtonForProduct('/dotconnect/oracle/download.html');
  await downloadProductWebsitePage.downloadAndCheckFileIsDownloaded(7);
});

test.only('AUT-05: Check added products in the cart', async ({
  page,
  signInPage,
  purchasedProductsCustomerPortalPage,
  homeWebsitePage,
  productsWebsitePage,
  pricingOptionsPage,
  shoppingCartDropdownWebsitePage,
}) => {
  const dbForgeStudioForSqlServer = new ProductCart(
    'dbForge Studio for SQL Server',
    Edition.Standard,
    DurationEnum['1 years'],
    0,
    null,
    5,
    true,
    PurchaseType.Perpetual,
  );
  const dotConnectForOracle = new ProductCart(
    'dotConnect for Oracle',
    Edition.Standard,
    DurationEnum['1 years'],
    0,
    null,
    1,
    true,
    null,
  );
  const dbForgeSQLTools = new ProductCart(
    'dbForge SQL Tools',
    Edition.Standard,
    DurationEnum['1 years'],
    0,
    null,
    1,
    true,
    PurchaseType.Subscription,
  );
  const SSISIntegrationDatabaseBundle = new ProductCart(
    'SSIS Integration Universal Bundle',
    Edition.Standard,
    DurationEnum['3 years'],
    0,
    null,
    5,
    true,
    null,
  );
  const products: IProductCartModel[] = [
    dbForgeStudioForSqlServer,
    dotConnectForOracle,
    dbForgeSQLTools,
    SSISIntegrationDatabaseBundle,
  ];

  await homeWebsitePage.open();
  await homeWebsitePage.openSignInPage();
  await signInPage.login(licenseOwner.email, licenseOwner.password);
  await purchasedProductsCustomerPortalPage.openStore();
  // Cleare shopping list in the cart
  await page.request.post('https://www.devart.com/api/cart/remove-cart', {});
  await productsWebsitePage.clickViewPricingOptionsForProduct('/dbforge/sql/studio/ordering.html');

  await pricingOptionsPage.addDbForgeProductToCart(
    dbForgeStudioForSqlServer.edition,
    dbForgeStudioForSqlServer.purchaseType,
    dbForgeStudioForSqlServer.duration,
    dbForgeStudioForSqlServer.prioritySupport,
    dbForgeStudioForSqlServer.quantity,
  );
  // Add product to cart

  await pricingOptionsPage.checkProductAddedToCartSnackbar();
  // Filter products
  await page.goBack();
  await page.waitForSelector('div.store-img');
  await productsWebsitePage.filterProductsByCategory('Data connectivity');
  // Click 'add to cart' button for product 'dotConnect for Oracle'
  await page.locator('.devart-tooltip').first().click();
  await pricingOptionsPage.checkProductAddedToCartSnackbar();
  // Uncheck filtering
  await productsWebsitePage.filterProductsByCategory('Data connectivity');
  // Click 'add to cart' button for product 'dotConnect for Oracle'
  await page.locator('.devart-tooltip').nth(1).click();
  await expect(await page.locator('.show-snackbar')).toBeVisible();
  // Navigate to Product through Main Menu
  await (await (await homeWebsitePage.openProductsMenu()).openDataConnectivityMenuItem()).menuItem('SSIS Components');
  // Click buy now for 'SSIS Integration Universal Bundle'
  await page.locator('a[href="universal-bundle/"]').getByText(SSISIntegrationDatabaseBundle.name).click();
  await page.locator('.banner-btn').getByText('Buy now').click();
  await page.waitForSelector('.pricing-box');
  await pricingOptionsPage.setProductParametersSSIS(
    SSISIntegrationDatabaseBundle.duration,
    SSISIntegrationDatabaseBundle.prioritySupport,
    SSISIntegrationDatabaseBundle.quantity,
  );
  await page.locator('.btn-add_cart').first().click();
  await pricingOptionsPage.checkProductAddedToCartSnackbar();

  await homeWebsitePage.openCartDropdown();
  const cartProducts = await shoppingCartDropdownWebsitePage.getProductsList();
  console.log(cartProducts);
  // console.log(await shoppingCartDropdownWebsitePage.checkCartProducts(cartProducts, products));
});

test('AUT-06: Checked creating account, change password, deleting account', async ({
  page,
  signInPage,
  signUpPage,
  homeWebsitePage,
  purchasedProductsCustomerPortalPage,
  profilePersonalInformationCustomerPortalPage,
  profileSecureInformationCustomerPortalPage,
  profileDeleteCustomerPortalPage,
}) => {
  const userEmail = users.deletedUser.email;
  const name = users.deletedUser.name;
  let password = users.deletedUser.password;
  let newPassword = users.deletedUser.newPassword;

  await homeWebsitePage.open();
  await homeWebsitePage.openSignInPage();
  await signInPage.openSignUpForm();
  await signUpPage.signUp(name, userEmail, password);
  if (await page.locator('#register-account .validation-summary-errors').isVisible()) {
    await signUpPage.openSignInPage();
    await signInPage.login(userEmail, password);
    if (await page.locator('.tab-pane#login').isVisible()) {
      //Login with new password and change password value in variable
      const temp = password;
      password = newPassword;
      newPassword = temp;
      await signInPage.login(userEmail, password);
    }
  }
  await purchasedProductsCustomerPortalPage.openProfilePage();
  await profilePersonalInformationCustomerPortalPage.openSecureInformationPage();
  await profileSecureInformationCustomerPortalPage.changePassword(password, newPassword, newPassword);
  await profileSecureInformationCustomerPortalPage.logout();
  // Login with new password
  await homeWebsitePage.openSignInPage();
  await signInPage.login(userEmail, newPassword);
  // Delete profile
  await purchasedProductsCustomerPortalPage.openProfilePage();
  await profilePersonalInformationCustomerPortalPage.openDeleteProfileTab();
  await profileDeleteCustomerPortalPage.deleteProfile();
  //Check snackbar is shown.
  await profileDeleteCustomerPortalPage.checkConfirmEmailIsShown();
  // Read email and navigate on link in email
  const emailHTML = await mailHelper.readEmail(
    page,
    'website@devart.com',
    userEmail,
    'Please confirm Devart account deletion',
  );
  const verificationCodeFromEmail = await mailHelper.getDeleteAccountLink(emailHTML);
  await page.goto(verificationCodeFromEmail);
  // Check information that account is deleted
  await expect(await page.locator('.account-deleted__title').getByText('Account deleted successfully')).toBeVisible();
  await homeWebsitePage.open();
  await homeWebsitePage.openSignInPage();
  await signInPage.login(userEmail, password);
  await signInPage.checkInvalidLoginPasswordWarningIsDisplayed();
});
