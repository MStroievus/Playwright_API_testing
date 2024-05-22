import { expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class ContactList extends BasePage {
  public readonly pagePath: "/contactList";
  public readonly title = this.page.locator('h1')
  public readonly addANewContactButton = this.page.getByRole('button', { name: 'Add a New Contact' })




  async checkTitle() {
    await expect(this.title).toHaveText('Contact List')
  }
}