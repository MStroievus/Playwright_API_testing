import { mergeTests } from "@playwright/test";
import { userFixture } from "../logicFixture/UsersFixture";
import { contextFixture } from "../logicFixture/ContactFixture";




export const test = mergeTests(userFixture, contextFixture)