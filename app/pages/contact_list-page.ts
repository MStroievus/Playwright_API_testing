import { expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { AddContactPageModel } from "../utils/model/add_contact_page-model";

export class ContactListPage extends BasePage {
  public readonly pagePath: "/contactList";
  public readonly addANewContactButton = this.page.getByRole('button', { name: 'Add a New Contact' })

  async checkTitle() {
    await expect(this.title).toHaveText('Contact List')
  }

  async getNeededContact() {
    const emailRows = this.page.locator('[class="contactTableBodyRow"]').first()
    await emailRows.click()
  }

  async checkCreatedContact(data: AddContactPageModel) {
    const properties = Object.values(data)
    const nameFields = await this.page.locator(`[class="contactTableBodyRow"] td:nth-child(2)`).all();

    for (const nameField of nameFields) {
      const text = await nameField.innerText();
      if (properties.some(value => text.includes(value.toString()))) {
        return true;
      }
    }

    return false;
  }

  async clickOnCreatedContact(data: AddContactPageModel) {
    await this.page.waitForSelector('[class="contactTableBodyRow"]');

    const nameFields = this.page.locator('[class="contactTableBodyRow"] td:nth-child(4)');
    const count = await nameFields.count();

    for (let i = 0; i < count; i++) {
      const nameField = nameFields.nth(i);
      const text = await nameField.innerText();

      if (text === data.email) {
        await nameField.scrollIntoViewIfNeeded();
        await nameField.click({ force: true });
        return;
      }
    }

    throw new Error(`Contact with email ${data.email} not found`);
  }

}