import { mergeTests } from "@playwright/test";
import { ContactAPIClient } from "../api/contact-api-client";
import { APIContextFactory } from "../context/context-factory";
import { ApiContext } from "../utils/constants/Contexts";
import { AddContactBuilder } from "../utils/data/builder/add_contact-data-builder";
import { Validator } from "../utils/schema/Validator";
import { userFixture } from "./users-fixture";
import { ApiAuth } from "../utils/types/api/endpoints/LogInUser";
import { test as base } from "@playwright/test";


type UserFixture = {
  testUser: ApiAuth
}

type AuthContactAPIClient = {
  contactAPIClient: ContactAPIClient
  validation: Validator
  builder: AddContactBuilder
}

export const AuthContactAPIClientFixture = base.extend<AuthContactAPIClient, UserFixture>({
  contactAPIClient: async ({ testUser }, use) => {
    const authenticatedContext = await APIContextFactory.contextFactory(ApiContext.AuthAPIContext, testUser);
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






export const test = mergeTests(userFixture, AuthContactAPIClientFixture)