import { APIRequestContext, request } from '@playwright/test';
import { APIContext } from '../../utils/types/api/api-Interfaces/api-context';

//! newContext() - Створює нові екземпляри APIRequestContext .

export class DefaultAPIContext implements APIContext {
  async createContext(): Promise<APIRequestContext> {
    return await request.newContext({
      baseURL: process.env.BASE_URL
    });
  }
}

