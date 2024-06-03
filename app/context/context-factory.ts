import { APIRequestContext } from "@playwright/test";
import { ApiAuth } from "../../utils/types/api/endpoints/logInUser";
import { BaseAPIContext } from "./base_api-context";
import { ApiContext } from "../../utils/constants/contexts";
import { AuthenticatedAPIContext } from "./authorized_api-context"

export class APIContextFactory {
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
