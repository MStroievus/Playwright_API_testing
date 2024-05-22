import { PageUrl } from "../../utils/constants/pages";
import { AddContactPageModel } from "../../utils/model/add_contact_page-model";
import { BasePage } from "./base-page";

export class AddContactPage extends BasePage {
  public readonly pagePath: PageUrl.addContactPage;
  public readonly submitButton = this.page.getByRole('button', { name: "Submit" })

  getPlaceholderByName(placeholderName: string) {
    return this.page.getByPlaceholder(placeholderName);
  }


  async fillForm(data: AddContactPageModel) {
    await this.getPlaceholderByName('First Name').fill(data.firstName)
    await this.getPlaceholderByName('Last Name').fill(data.lastName)
    await this.getPlaceholderByName('yyyy-MM-dd').fill(data.birthDate)
    await this.getPlaceholderByName('example@email.com').fill(data.email)
    await this.getPlaceholderByName('8005551234').fill(data.phone.toString())
    await this.getPlaceholderByName('Address 1').fill(data.street1)
    await this.getPlaceholderByName('Address 2').fill(data.street2)
    await this.getPlaceholderByName('City').fill(data.city)
    await this.getPlaceholderByName('State or Province').fill(data.stateProvince)
    await this.getPlaceholderByName('Postal Code').fill(data.postalCode.toString())
    await this.getPlaceholderByName('Country').fill(data.country)
  }

  async clearForm() {
    await this.getPlaceholderByName('First Name').clear()
    await this.getPlaceholderByName('Last Name').clear()
    await this.getPlaceholderByName('yyyy-MM-dd').clear()
    await this.getPlaceholderByName('example@email.com').clear()
    await this.getPlaceholderByName('8005551234').clear()
    await this.getPlaceholderByName('Address 1').clear()
    await this.getPlaceholderByName('Address 2').clear()
    await this.getPlaceholderByName('City').clear()
    await this.getPlaceholderByName('State or Province').clear()
    await this.getPlaceholderByName('Postal Code').clear()
    await this.getPlaceholderByName('Country').clear()
  }
}