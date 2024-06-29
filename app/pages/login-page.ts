import { PageUrl } from "../utils/constants/pages";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
  public readonly pagePath = PageUrl.homePage;
  public readonly errorMessage = this.page.locator('#error')

  async fillForm(email: string, password: string) {
    await this.getPlaceholderByName('Email').fill(email);
    await this.getPlaceholderByName('Password').fill(password);
  }
}
