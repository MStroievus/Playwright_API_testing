import { test as base } from "@playwright/test";
import { AddContactPage } from "../pages/add_contact-page";
import { ContactDetailPage } from "../pages/contact_detail-page";
import { ContactListPage } from "../pages/contact_list-page";
import { EditContactPage } from "../pages/edit_contact-page";
import { LoginPage } from "../pages/login-page";

export type Pages = {
  loginPage: LoginPage;
  contactListPage: ContactListPage;
  addContactPage: AddContactPage;
  contactDetailPage: ContactDetailPage;
  editContactPage: EditContactPage;
};


export const pages = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  contactListPage: async ({ page }, use) => {
    const contactListPage = new ContactListPage(page);
    await use(contactListPage);
  },

  addContactPage: async ({ page }, use) => {
    const addContactPage = new AddContactPage(page);
    await use(addContactPage);
  },

  contactDetailPage: async ({ page }, use) => {
    const contactDetailPage = new ContactDetailPage(page);
    await use(contactDetailPage);
  },

  editContactPage: async ({ page }, use) => {
    const editContactPage = new EditContactPage(page);
    await use(editContactPage);
  },
})
