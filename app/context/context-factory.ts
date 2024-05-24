import { APIRequestContext, BrowserType, chromium, firefox, webkit } from "@playwright/test";
import { APIContext } from "../../utils/types/api/api-interfaces/api-context";
import { ApiAuth } from "../../utils/types/api/endpoints/logInUser";
import { AuthenticatedAPIContext } from "./authorized_api-context";
import { DefaultAPIContext } from "./default_api-context";
import { ApiContext, BrowserContext } from "../../utils/constants/contexts";
import { DefaultBrowserContext } from "./default_browser-context";

//! Патерн Фабричний метод пропонує відмовитись від безпосереднього створення об’єктів за допомогою оператора new, замінивши його викликом особливого фабричного методу.

//?Основна ідея фабричного методу полягає в тому, що він абстрагує процес створення об'єктів від самого коду, який їх використовує. Це дозволяє легко вводити нові типи об'єктів без зміни коду, який їх використовує, підвищуючи гнучкість та розширюваність системи.



export class APIContextFactory {
  static async contextFactory(selectedContext: string, data: ApiAuth = {}): Promise<APIRequestContext> {
    switch (selectedContext) {
      case ApiContext.AuthAPIContext:
        return await this.createContext(new AuthenticatedAPIContext(data));
      case ApiContext.BaseAPIContext:
        return await this.createContext(new DefaultAPIContext());
      default:
        throw new Error('Provide context');
    }
  }
  private static async createContext(context: APIContext): Promise<APIRequestContext> {
    return await context.createContext();
  }
}

export class BrowserFactory {
  static async contextFactory(browserType: BrowserType): Promise<DefaultBrowserContext> {
    switch (browserType) {
      case chromium:
        return new DefaultBrowserContext();
      case firefox:
        return new DefaultBrowserContext();
      case webkit:
        return new DefaultBrowserContext();
      default:
        throw new Error('Invalid browser type');
    }
  }
}