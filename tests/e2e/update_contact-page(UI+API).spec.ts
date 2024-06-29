import test, { expect } from "@playwright/test";
import { LoginPage } from "../../app/pages/login-page";
import { ContactListPage } from "../../app/pages/contact_list-page";
import { AddContactPageModel, TestDataGenerator } from "../../app/utils/model/add_contact_page-model";
import { ContactDetailPage } from "../../app/pages/contact_detail-page";
import { EditContactPage } from "../../app/pages/edit_contact-page";
import { APIContextFactory } from "../../app/context/context-factory";
import { ContactAPIClient } from "../../app/api/contact-api-client";
import { ApiContext } from "../../app/utils/constants/Contexts";
import { ApiAuth } from "../../app/utils/types/api/endpoints/LogInUser";
import { AddContactBuilder } from "../../app/utils/data/builder/add_contact-data-builder";
import { PageUrl } from "../../app/utils/constants/pages";


const testUser: ApiAuth = {
  user: {
    email: process.env.TEST_USER_EMAIL!,
    password: process.env.TEST_USER_PASSWORD!
  }
}

test.describe('Edit contact contact', () => {
  test.use({ storageState: '.auth/user.json' });

  //Ця частина тільки тому що  сайт  не працює із  кукі правильно, цього не потрібно якщо у вас  сайт може працювати із  кукі
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    const contactList = new ContactListPage(page)
    await page.goto(PageUrl.homePage);
    await loginPage.fillForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await loginPage.getButtonByName('Submit').click();
    await expect(contactList.title).toHaveText('Contact List');

  })

  test.only('Edit contact with API', { tag: ['@e2e', '@regression', '@smoke'] }, async ({ page }) => {
    const authenticatedContext = await APIContextFactory.contextFactory(ApiContext.AuthAPIContext, testUser);
    const contactAPIClient = new ContactAPIClient(authenticatedContext);
    const contactDetailPage = new ContactDetailPage(page)
    const contactListPage = new ContactListPage(page)
    const editContactPage = new EditContactPage(page)
    const builder = new AddContactBuilder()
    const data1 = builder.fullObject().build()
    const data2 = builder.fullObject().build()

    //Precondition
    contactAPIClient.addContact(data1 as AddContactPageModel)
    //Сервер записує контакт в базу біля 1 секунди, чекати на елемент, дом чи щось інше не допомвгає, контакт зявиться тільки  після близько 1 секунди
    await page.waitForTimeout(1000)
    await contactListPage.clickOnCreatedContact(data1 as AddContactPageModel)
    await contactDetailPage.getButtonByName('Edit Contact').click()
    await page.waitForTimeout(1000)
    await expect(editContactPage.title).toHaveText('Edit Contact')

    //Steps
    await editContactPage.clearForm()
    await editContactPage.fillForm(data2 as AddContactPageModel);
    await editContactPage.getButtonByName("Submit").click()
    await contactDetailPage.checkUpdatedData(data2 as AddContactPageModel)


    //Clean up
    await contactAPIClient.deleteEntities()

  });
});





