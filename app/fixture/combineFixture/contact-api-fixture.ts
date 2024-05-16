import { mergeTests } from "@playwright/test";
import { userFixture } from "../logicFixture/users-fixture";
import { contextContactAPIFixture } from "../logicFixture/auth_contact-api-client-fixture";




export const test = mergeTests(userFixture, contextContactAPIFixture)