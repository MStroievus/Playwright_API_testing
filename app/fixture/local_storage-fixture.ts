import { test as base } from "@playwright/test";
import fs from "fs";
import path from "path";
import { APIContextFactory } from "../context/context-factory";
import { ApiContext } from "../utils/constants/Contexts";
import { UsersAPIClient } from "../api/users-api-client";
import { AuthUser } from "../utils/types/api/endpoints/LogInUser";
export { expect } from "@playwright/test";

// Declare the types of your fixtures.
type MyFixtures = {
  userToLogin?: string;
};

export const localStorageFixture = base.extend<MyFixtures>({
  userToLogin: undefined,

  //!! ця фікстура виконається першою
  storageState: async ({ userToLogin }, use) => {
    if (userToLogin) {
      const authDir = path.join(__dirname, '..', '..', '.auth');
      if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
      }
      const fileName = path.join(authDir, `${userToLogin}.json`);
      if (!fs.existsSync(fileName)) {
        const context = await APIContextFactory.contextFactory(ApiContext.BaseAPIContext);
        const usersAPIClient = new UsersAPIClient(context);
        const user: AuthUser = {
          email: process.env.TEST_USER_EMAIL!,
          password: process.env.TEST_USER_PASSWORD!
        };
        await usersAPIClient.getLogInUserAPI(user);
        await context.storageState({ path: fileName });
      }
      await use(fileName);
    } else {
      await use(undefined);
    }
  }
});
