import { Page, test as baseTest, expect, Response, mergeTests } from "@playwright/test";
import { ContactAPIClient } from "../api/contact-api-client";
import { AddContactBuilder } from "../utils/data/builder/add_contact-data-builder";
import { ApiAuth } from "../utils/types/api/endpoints/LogInUser";
import { APIContextFactory } from "../context/context-factory";
import { ApiContext } from "../utils/constants/Contexts";
import { AddContactEndpoint } from "../utils/types/api/endpoints/addContact";
import { ContactListPage } from "../../app/pages/contact_list-page";
import { AddContactPage } from "../../app/pages/add_contact-page";
import { userFixture } from "./users-fixture";
import { LoginPage } from "../pages/login-page";
import { PageUrl } from "../utils/constants/pages";
import { localStorageFixture } from "./local_storage-fixture";

type AddContactFixture = {
  contactAPIClient: ContactAPIClient,
  addContact: AddContactBuilder
  contactListPage: ContactListPage,
  addContactPage: AddContactPage,
  loginPage: LoginPage
  login: Page

}

type UserFixture = {
  testUser: ApiAuth
}



export const addContactFixture = baseTest.extend<UserFixture & AddContactFixture>({
  contactAPIClient: async ({ testUser }, use) => {
    const authenticatedContext = await APIContextFactory.contextFactory(ApiContext.AuthAPIContext, testUser);
    const contactAPIClient = new ContactAPIClient(authenticatedContext);
    await use(contactAPIClient);
  },

  addContact: async ({ contactAPIClient }, use) => {
    const addContact = new AddContactBuilder();
    const data = addContact.fullObject().build() as AddContactEndpoint;
    await contactAPIClient.addContact(data);
    await use(addContact);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  contactListPage: async ({ page }, use) => {
    await use(new ContactListPage(page));
  },

  addContactPage: async ({ page }, use) => {
    await use(new AddContactPage(page));
  },

  login: async ({ page, loginPage, contactListPage }, use) => {
    await page.goto(PageUrl.homePage);
    await loginPage.fillForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await loginPage.getButtonByName('Submit').click();
    await expect(contactListPage.title).toHaveText('Contact List');
    await use(page);
  }
});

export const test = mergeTests(addContactFixture, userFixture, localStorageFixture);
