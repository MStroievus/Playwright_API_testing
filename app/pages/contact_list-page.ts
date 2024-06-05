import { expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { AddContactPageModel } from "../utils/model/add_contact_page-model";

export class ContactList extends BasePage {
  public readonly pagePath: "/contactList";
  public readonly title = this.page.locator('h1')
  public readonly addANewContactButton = this.page.getByRole('button', { name: 'Add a New Contact' })




  async checkTitle() {
    await expect(this.title).toHaveText('Contact List')
  }

  async getNeedContact(data: AddContactPageModel) {
    const emailRows = this.page.locator('tr td:nth-child(4)', { hasText: data.email })
    await emailRows.click()
  }
}