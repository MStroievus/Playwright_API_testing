import { APIRequestContext, Page } from "@playwright/test";
import { IPage } from "../utils/types/web/pages/page";

export abstract class BasePage implements IPage {
  abstract readonly pagePath: string;
  public readonly title = this.page.locator('h1')

  constructor(public page: Page, context?: APIRequestContext) { }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  getPlaceholderByName(placeholderName: string) {
    return this.page.getByPlaceholder(placeholderName);
  }

  getButtonByName(buttonName: string) {
    return this.page.getByRole('button', { name: buttonName });
  }

}
