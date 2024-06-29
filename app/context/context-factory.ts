import { APIRequestContext } from "@playwright/test";
import { ApiAuth } from "../utils/types/api/endpoints/LogInUser";
import { BaseAPIContext } from "./base_api-context";
import { AuthenticatedAPIContext } from "./authorized_api-context";
import { ApiContext } from "../utils/constants/Contexts";
import { test } from '@playwright/test';

/**
 * Цей APIContextFactory клас створює різні типи контекстів API на основі вказаного типу контексту,
 * підтримуючи як аутентифіковані, так і базові контексти API.
 */

export class APIContextFactory {
  /**
   * Створює контекст запиту API на основі вибраного типу контексту.
   * @param selectedContext - Тип контексту для створення
   * @param data - Дані аутентифікації, необхідні для створення аутентифікованого контексту.
   * @returns Об'єкт Promise, що вирішується до APIRequestContext.
   */
  static async contextFactory(selectedContext: string, data: ApiAuth = {}): Promise<APIRequestContext> {
    const baseURL = process.env.BASE_URL;
    if (!baseURL) {
      throw new Error('BASE_URL environment variable is not set');
    }

    return await test.step(`Create API context of type: ${selectedContext}`, async () => {
      switch (selectedContext) {
        case ApiContext.AuthAPIContext:
          return await this.createContext(new AuthenticatedAPIContext(baseURL, data));
        case ApiContext.BaseAPIContext:
          return await this.createContext(new BaseAPIContext(baseURL));
        default:
          throw new Error('Provide valid context type');
      }
    });
  }

  /**
   * Цей приватний метод ініціалізує та повертає контекст запиту API згідно з переданим об'єктом BaseAPIContext.
   * @param context - Екземпляр класу BaseAPIContext для створення контексту.
   * @returns Об'єкт Promise, що вирішується до APIRequestContext.
   */
  private static async createContext(context: BaseAPIContext): Promise<APIRequestContext> {
    return await context.createContext();
  }
}
