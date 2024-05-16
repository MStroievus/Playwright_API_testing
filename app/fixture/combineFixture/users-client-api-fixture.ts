import { mergeTests } from "@playwright/test";
import { usersAPIClient } from "../logicFixture/users-api-client-fixture";





export const test = mergeTests(usersAPIClient)