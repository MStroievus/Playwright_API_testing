/* eslint-disable no-empty-pattern */
import { test as base } from "@playwright/test";
import { ApiAuth, AuthUser } from "../utils/types/api/endpoints/LogInUser";

type UserFixture = {
  testUser: ApiAuth
}

export const userFixture = base.extend<UserFixture>({
  testUser: async ({ }, use) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    const token = process.env.TEST_USER_TOKEN;

    if (!email && !password && !token) {
      throw new Error(`Provide either "TEST_USER_EMAIL" and "TEST_USER_PASSWORD" or "TEST_USER_TOKEN" inside .env`);
    }

    if (token) {
      const testUser: ApiAuth = { token };
      use(testUser);
    } else if (email && password) {
      const user: AuthUser = { email, password };
      const testUser: ApiAuth = { user };
      use(testUser);
    } else {
      throw new Error(`Provide both "TEST_USER_EMAIL" and "TEST_USER_PASSWORD" or "TEST_USER_TOKEN" inside .env`);
    }
  }
});