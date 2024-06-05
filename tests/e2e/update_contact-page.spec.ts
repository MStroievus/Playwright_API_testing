import test from "@playwright/test";
import { PageUrl } from "../../app/utils/constants/pages";
import { ContactList } from "../../app/pages/contact_list-page";
import { AddContactPage } from "../../app/pages/add_contact-page";
import { formsData } from "../../app/utils/model/add_contact_page-model";



const authFile = '.auth/user.json';

test.describe('Update contact', () => {

  test.use({ storageState: authFile });
  test(
    'Update contact',
    {
      tag: ['@e2e', '@regression', '@smoke']
    },
    async ({ page }) => {
      await page.goto(PageUrl.homePage);
      const contactList = new ContactList(page);
      const addContactPage = new AddContactPage(page);

      await contactList.addANewContactButton.click();
      await addContactPage.fillForm(formsData);
      await addContactPage.submitButton.click();
      await contactList.getNeedContact(formsData);
      await addContactPage.clearForm();
    }
  );
});
