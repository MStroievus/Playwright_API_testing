import { BrowserContext, BrowserType, chromium, firefox, webkit } from "@playwright/test";
import { IBrowserContext } from "../../utils/types/web/browser/browser-context";

export class DefaultBrowserContext implements IBrowserContext {

  async createContext(browser: BrowserType): Promise<BrowserContext> {
    const newBrowser = await browser.launch();
    const newContext = await newBrowser.newContext();
    return newContext;
  }
}
