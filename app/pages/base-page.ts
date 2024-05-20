import { Page } from "@playwright/test";
import { IPage } from "../../utils/types/web/pages/page";

export abstract class BasePage implements IPage {
  constructor(public page: Page) { }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  async getPlaceholder() {

  }
}
