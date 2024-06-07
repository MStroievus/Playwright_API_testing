import { expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { AddContactPageModel } from "../utils/model/add_contact_page-model";

export class ContactListPage extends BasePage {
  public readonly pagePath: "/contactList";
  public readonly title = this.page.locator('h1')
  public readonly addANewContactButton = this.page.getByRole('button', { name: 'Add a New Contact' })




  async checkTitle() {
    await expect(this.title).toHaveText('Contact List')
  }

  async getNeededContact() {
    const emailRows = this.page.locator('[class="contactTableBodyRow"]').first()
    await emailRows.click()
  }
}