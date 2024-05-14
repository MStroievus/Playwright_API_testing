import { APIRequestContext } from "@playwright/test";

export interface APIContext {
  createContext(): Promise<APIRequestContext>;
}