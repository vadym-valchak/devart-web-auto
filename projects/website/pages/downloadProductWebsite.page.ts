import { Page, expect } from '@playwright/test';
import { isFileExist, removeFolder } from '../../../helpers/fileOperations.helper';
import { BasePage } from './base.page';

export class DownloadProductWebsitePage extends BasePage {
  readonly page: Page;
  readonly downloadDir: string = './downloads/';

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async downloadProductBuild(order: number) {
    await this.page.locator("a:has-text('Get Trial')").nth(order).click();
  }

  async downloadAndCheckFileIsDownloaded(order: number) {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.locator("a[title='Download']").nth(order).click();
    const download = await downloadPromise;
    const fileName = await download.suggestedFilename();
    await download.saveAs(this.downloadDir + fileName);
    // Check that file is exist;
    await expect(await isFileExist(this.downloadDir + fileName)).toBeTruthy();
    await removeFolder(this.downloadDir);
  }
}
