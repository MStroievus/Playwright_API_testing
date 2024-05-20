import { BasePage } from "./base-page"

export class LoginPage extends BasePage {



  getButtonByName = (buttonName: string) => this.page.getByRole('button', { name: buttonName })






}