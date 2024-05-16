import { test as base } from "@playwright/test";
import { APIContextFactory } from "../../context/ContextFactory";
import { ContactAPIClient } from "../../api/ContactAPIClient";
import { ApiContext } from "../../../utils/constants/Contexts";
import { Validation } from "../../../utils/schema/Validator";
import { UserFixture } from "./UsersFixture";

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
