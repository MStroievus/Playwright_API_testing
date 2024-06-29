import test, { expect } from "@playwright/test";
import { PageUrl } from "../utils/constants/pages";
import { AddContactPageModel } from "../utils/model/add_contact_page-model";
import { BasePage } from "./base-page";


export class ContactDetailPage extends BasePage {
  pagePath: PageUrl.contactDetailPage;

  async acceptAlertMessage() {
    await test.step('Accept alert message', async () => {
      this.page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete this contact?')
        dialog.accept()
      })
    });
  }

  getFieldByID(iDName: string) {
    return this.page.locator(`#${iDName}`)
  }

  async checkUpdatedData(data: AddContactPageModel) {
    await test.step(`Check updated data for ${JSON.stringify(data)}`, async () => {
      this.getFieldByID('firstName')
      await expect(this.getFieldByID('firstName')).toHaveText(data.firstName);
      await expect(this.getFieldByID('lastName')).toHaveText(data.lastName)
    });
  }
}
