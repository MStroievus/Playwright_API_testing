import { test as base } from "@playwright/test";
import { APIContextFactory } from "../../context/context-factory";
import { ContactAPIClient } from "../../api/contact-api-client";
import { ApiContext } from "../../../utils/constants/contexts";
import { Validator } from "../../../utils/schema/validator";
import { UserFixture } from "./users-fixture";

export type AuthContactAPIClient = {
  contactAPIClient: ContactAPIClient
  validation: Validator
}

export const contextContactAPIFixture = base.extend<AuthContactAPIClient, UserFixture>({
  contactAPIClient: async ({ testUser }, use) => {
    const authenticatedContext = await APIContextFactory.contextFactory(ApiContext.AuthContext, testUser);
    const contactAPIClient = new ContactAPIClient(authenticatedContext);

    await use(contactAPIClient);

  },

  validation: async ({ }, use) => {
    await use(new Validator());
  },
});
