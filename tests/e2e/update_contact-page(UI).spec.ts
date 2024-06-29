import test, { expect } from "@playwright/test";
import { LoginPage } from "../../app/pages/login-page";
import { ContactListPage } from "../../app/pages/contact_list-page";
import { AddContactPage } from "../../app/pages/add_contact-page";
import { TestDataGenerator } from "../../app/utils/model/add_contact_page-model";
import { ContactDetailPage } from "../../app/pages/contact_detail-page";
import { EditContactPage } from "../../app/pages/edit_contact-page"
import { PageUrl } from "../../app/utils/constants/pages";


test.describe('Edit contact contact', () => {

  test('Edit contact without fixture and API', { tag: ['@e2e', '@regression', '@smoke'] }, async ({ page }) => {
    const loginPage = new LoginPage(page)
    const contactList = new ContactListPage(page);
    const addContactPage = new AddContactPage(page)
    const contactDetailPage = new ContactDetailPage(page)
    const editContactPage = new EditContactPage(page)
    const initialContactData = TestDataGenerator.createContactData();
    const updatedContactData = TestDataGenerator.createContactData();

    // Preconditions
    await loginPage.fillForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await loginPage.getButtonByName('Submit').click();
    await expect(contactList.title).toHaveText('Contact List');

    await contactList.addANewContactButton.click()
    await expect(addContactPage.title).toHaveText('Add Contact')

    await addContactPage.fillForm(initialContactData)
    await addContactPage.getButtonByName('Submit').click()
    await expect(contactList.title).toHaveText('Contact List');

    await contactList.checkCreatedContact(initialContactData)
    await contactList.clickOnCreatedContact(initialContactData)
    await expect(contactDetailPage.title).toHaveText('Contact Details')

    // Steps
    await contactDetailPage.getButtonByName('Edit Contact').click()
    await page.waitForTimeout(1000) // це тестовий проект  через те що  плейврайт робить це дуже швидко(ніякі вейтори не працють, яктільки загружається поле він його апдейтить і тест не апдейтиться(проблема в тестовому проекті) треба робити паузу(нажаль)
    await expect(editContactPage.title).toHaveText('Edit Contact')

    await editContactPage.clearForm()
    await editContactPage.fillForm(updatedContactData);
    await editContactPage.getButtonByName("Submit").click()
    await contactDetailPage.checkUpdatedData(updatedContactData)

    // clean up
    await contactDetailPage.acceptAlertMessage()
    await contactDetailPage.getButtonByName('Delete Contact').click()
  });


});





