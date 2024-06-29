import { Page, test as base, mergeTests } from "@playwright/test";
import { basePageFixture } from "./base_page-fixture";
import { PageUrl } from "../utils/constants/pages";
import { Pages, pages } from "./pages-fixture";
import { AuthContactAPIClientFixture } from "./auth_contact_api_client-fixture";
import { AddContactBuilder } from "../utils/data/builder/add_contact-data-builder";
import { userFixture } from "./users-fixture";

type AddContactFixture = {
  withLogin: Page
  builder: AddContactBuilder
};

export const addContactFixture = base.extend<AddContactFixture & Pages>({

  withLogin: async ({ loginPage, page }, use) => {
    await page.goto(PageUrl.homePage)
    await loginPage.fillForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await loginPage.getButtonByName('Submit').click();

    await use(page);
    await page.close()
  },

  // eslint-disable-next-line no-empty-pattern
  builder: async ({ }, use) => {
    const builder = new AddContactBuilder()
    await use(builder)
  }
},
);

export const test = mergeTests(basePageFixture, addContactFixture, AuthContactAPIClientFixture, userFixture, pages)