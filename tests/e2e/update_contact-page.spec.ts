import { formsData } from "../../app/utils/model/add_contact_page-model";
import { test } from "../../app/fixture/add_contact_e2e-fixture"
import { PageUrl } from "../../app/utils/constants/pages";


test.describe('Update contact', () => {
  test.use({ userToLogin: 'tomato_gn1@i.ua' })
  test.only('Update contact', { tag: ['@e2e', '@regression', '@smoke'] }, async ({ addContact, login, contactListPage, addContactPage, page }) => {
    await contactListPage.getNeededContact()
    //TODO
    await addContactPage.submitButton.click();
    await addContactPage.clearForm();
  });
});
