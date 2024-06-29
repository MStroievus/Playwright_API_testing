import { PageUrl } from "../utils/constants/pages";
import { AddContactPageModel } from "../utils/model/add_contact_page-model";
import { BasePage } from "./base-page";

export class EditContactPage extends BasePage {
  pagePath: PageUrl.editContactPage;

  getInputByName(name: string) {
    return this.page.getByRole('textbox', { name: name })
  }


  async clearForm() {
    await this.page.reload()
    await this.page.waitForTimeout(1000)
    await this.getInputByName('First Name').clear()
    await this.getInputByName('Last Name').clear()
    await this.getInputByName('Date of Birth:').clear()
    await this.getInputByName('Email:').clear()
    await this.getInputByName('Phone:').clear()
    await this.getInputByName('Street Address 1:').clear()
    await this.getInputByName('Street Address 2:').clear()
    await this.getInputByName('City:').clear()
    await this.getInputByName('State or Province:').clear()
    await this.getInputByName('Postal Code:').clear()
    await this.getInputByName('Country:').clear()
  }

  async fillForm(data: AddContactPageModel) {
    await this.getInputByName('First Name').pressSequentially(data.firstName, {})
    await this.getInputByName('Last Name').pressSequentially(data.lastName, {})
    await this.getInputByName('Date of Birth:').fill(data.birthdate)
    await this.getInputByName('Email:').fill(data.email)
    await this.getInputByName('Street Address 1:').fill(data.street1)
    await this.getInputByName('Street Address 2:').fill(data.street2)
    await this.getInputByName('City:').fill(data.city)
    await this.getInputByName('State or Province:').fill(data.stateProvince)
    await this.getInputByName('Postal Code:').fill(data.postalCode.toString())
    await this.getInputByName('Country:').fill(data.country)
  }
}