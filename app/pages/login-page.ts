import { PageUrl } from "../../utils/constants/pages";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
  public readonly pagePath = PageUrl.homePage;
  public readonly title = this.page.locator('h1');
  public readonly errorMessage = this.page.locator('#error')

  getButtonByName(buttonName: string) {
    return this.page.getByRole('button', { name: buttonName });
  }

  getPlaceholderByName(placeholderName: string) {
    return this.page.getByPlaceholder(placeholderName);
  }

  async fillForm(email: string, password: string) {
    await this.getPlaceholderByName('Email').fill(email);
    await this.getPlaceholderByName('Password').fill(password);
  }
}
