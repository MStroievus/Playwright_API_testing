import { APIRequestContext, Browser, BrowserContext } from "@playwright/test";
import { ApiAuth, AuthUser } from "../utils/types/api/endpoints/LogInUser";
import { BaseAPIContext } from "./base_api-context";
import { AuthenticatedAPIContext } from "./authorized_api-context";
import { ApiContext } from "../utils/constants/Contexts";

//?This APIContextFactory class creates different types of API contexts based on the provided context type, supporting both authenticated and base API contexts.

//! https://refactoring.guru/ru/design-patterns/factory-method

/**
 * Цей файл визначає клас APIContextFactory, який генерує контексти запитів до API
 * на основі вибраного типу контексту. Клас використовує змінні оточення для визначення
 * базової URL-адреси для запитів API. Метод contextFactory визначає тип
 * контекст API для створення (автентифікований або базовий або  будь якого іншого який ви стоврите в майбутньому), використовуючи надані дані. Метод 
 * createContext ініціалізує та повертає відповідний контекст запиту API.
 */

export class APIContextFactory {
  /**
   * Creates an API request context based on the selected context type.
   * @param selectedContext - The type of context to create
   * @param data - The authentication data required for creating an authenticated context.
   * @returns A Promise that resolves to an APIRequestContext.
   */
  static async contextFactory(selectedContext: string, data: ApiAuth = {}): Promise<APIRequestContext> {
    const baseURL = process.env.BASE_URL;
    if (!baseURL) {
      throw new Error('BASE_URL environment variable is not set');
    }

    switch (selectedContext) {
      case ApiContext.AuthAPIContext:
        return await this.createContext(new AuthenticatedAPIContext(baseURL, data));
      case ApiContext.BaseAPIContext:
        return await this.createContext(new BaseAPIContext(baseURL));
      default:
        throw new Error('Provide context');
    }
  }
  private static async createContext(context: BaseAPIContext): Promise<APIRequestContext> {
    return await context.createContext();
  }
}
