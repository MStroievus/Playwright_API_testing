import { test as base } from "@playwright/test";
import { APIContextFactory } from "../../context/context-factory";
import { ContactAPIClient } from "../../api/contact-api-client";
import { ApiContext } from "../../../utils/constants/contexts";
import { Validator } from "../../../utils/schema/validator";
import { UserFixture } from "./users-fixture";
import { AddContactBuilder } from "../../../utils/data/builder/add_contact-data-builder";

export type AuthContactAPIClient = {
  contactAPIClient: ContactAPIClient
  validation: Validator
  builder: AddContactBuilder
}

export const contextContactAPIFixture = base.extend<AuthContactAPIClient, UserFixture>({
  contactAPIClient: async ({ testUser }, use) => {
    const authenticatedContext = await APIContextFactory.contextFactory(ApiContext.AuthContext, testUser);
    const contactAPIClient = new ContactAPIClient(authenticatedContext);

    await use(contactAPIClient);

    await contactAPIClient.deleteEntities()
  },

  validation: async ({ }, use) => {
    await use(new Validator());
  },

  builder: async ({ }, use) => {
    await use(new AddContactBuilder());
  },


});
