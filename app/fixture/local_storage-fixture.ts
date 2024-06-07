import { APIRequestContext, test as base, mergeTests } from "@playwright/test";
import fs from "fs";
import { APIContextFactory } from "../context/context-factory";
import { ApiContext } from "../utils/constants/Contexts";
import { UsersAPIClient } from "../api/users-api-client";
import { AuthUser } from "../utils/types/api/endpoints/LogInUser";
export { expect } from "@playwright/test";

// Declare the types of your fixtures.
type UsersName = {
  userToLogin?: string;
};

export const localStorageFixture = base.extend<UsersName>({
  userToLogin: undefined,

  storageState: async ({ request, userToLogin }, use) => {
    if (userToLogin) {
      const fileName = `./.auth/${userToLogin}.json`;

      if (!fs.existsSync(fileName)) {
        const usersEmail = process.env.TEST_USER_EMAIL;
        const usersPassword = process.env.TEST_USER_PASSWORD;
        const user: AuthUser = {
          email: usersEmail!,
          password: usersPassword!
        }

        const context: APIRequestContext = await APIContextFactory.contextFactory(ApiContext.BaseAPIContext);
        const usersAPIClient = new UsersAPIClient(context);
        await usersAPIClient.getLogInUserAPI(user);
        await request.storageState({ path: fileName });
        fs.readFileSync(fileName, 'utf-8');
        await request.dispose();
      } else {
        console.log(`File ${fileName} already exists. Using existing auth state.`);
      }

      await use(fileName);
    } else {
      await use(undefined);
    }
  }
});

const test = mergeTests(localStorageFixture);

export { test };
