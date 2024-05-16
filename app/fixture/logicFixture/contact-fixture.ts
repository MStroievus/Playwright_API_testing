import { test as base } from "@playwright/test";
import { APIContextFactory } from "../../context/context-factory";
import { ContactAPIClient } from "../../api/contact-api-client";
import { ApiContext } from "../../../utils/constants/contexts";
import { Validation } from "../../../utils/schema/validator";
import { UserFixture } from "./users-fixture";

export type ContextFixture = {
  contactAPIClient: ContactAPIClient
  validation: Validation
}

export const contextFixture = base.extend<ContextFixture, UserFixture>({
  contactAPIClient: async ({ testUser }, use) => {
    if (!testUser) {
      throw new Error("testUser is not defined. Ensure the user fixture is used.");
    }

    const authenticatedContext = await APIContextFactory.contextFactory(ApiContext.AuthContext, testUser);
    const contactAPIClient = new ContactAPIClient(authenticatedContext);

    await use(contactAPIClient);
  },

  validation: async ({ }, use) => {
    await use(new Validation());
  },
});
