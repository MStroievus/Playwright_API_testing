import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
  public readonly pagePath = '/';
  public readonly title = this.page.locator('h1');

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

  async expectLoaded(message?: string): Promise<void> {
    await this.title.waitFor({ state: 'visible', timeout: 5000 });
  }
}
