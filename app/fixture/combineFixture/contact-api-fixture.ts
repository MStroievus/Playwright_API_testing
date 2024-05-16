import { mergeTests } from "@playwright/test";
import { userFixture } from "../logicFixture/users-fixture";
import { contextFixture } from "../logicFixture/contact-fixture";




export const test = mergeTests(userFixture, contextFixture)