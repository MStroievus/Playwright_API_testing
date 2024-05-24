import { BrowserContext, BrowserType } from "@playwright/test";

export interface IBrowserContext {
  createContext(browser: BrowserType): Promise<BrowserContext>;
}
