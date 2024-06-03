import { test as base, mergeTests } from "@playwright/test";
import { APIContextFactory } from "../context/context-factory";
import { ApiContext } from "../../utils/constants/contexts";
import { Validator } from "../../utils/schema/validator";
import { UsersAPIClient } from "../api/users-api-client";

export type ContextFixture = {
  usersAPIClient: UsersAPIClient
  validation: Validator
}

export const usersAPIClient = base.extend<ContextFixture>({
  usersAPIClient: async ({ }, use) => {
    const context = await APIContextFactory.contextFactory(ApiContext.BaseAPIContext);
    const usersAPIClient = new UsersAPIClient(context);

    await use(usersAPIClient);
  },
  validation: async ({ }, use) => {
    await use(new Validator());
  },


});







export const test = mergeTests(usersAPIClient)