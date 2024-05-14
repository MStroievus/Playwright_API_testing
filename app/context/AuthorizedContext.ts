import { APIRequestContext, request } from '@playwright/test';
import { ApiAuth, AuthUser } from '../../utils/types/api/Endpoints/LogInUser';
import { APIContextFactory } from './ContextFactory';
import { APIContext } from '../../utils/types/api/clients/APIContext';
import { AuthAPIClient } from '../api/AuthAPIClient';

export class AuthenticatedAPIContext implements APIContext {
  private user?: AuthUser;
  private token?: string;

  constructor({ user, token }: ApiAuth) {
    this.user = user;
    this.token = token;
  }
  async createContext(): Promise<APIRequestContext> {
    let extraHTTPHeaders: { [key: string]: string } = {
      accept: '*/*',
      'Content-Type': 'application/json'
    };

    if (!this.user && !this.token) {
      throw Error('Provide "user" or "authToken"');
    }

    //? Через нашу логіку кожен апі клієнт повинен мати свій контекст, тому нам спочатку потрібно створити контекст і потім передати його в клієнт для того щоб можна було виконувати запити в данному клієнті
    if (this.user && !this.token) {
      const defaultContext = await APIContextFactory.contextFactory('BaseContext',);
      const authClient = new AuthAPIClient(defaultContext)
      const token = await authClient.getAPIToken(this.user);
      extraHTTPHeaders = { ...extraHTTPHeaders, Authorization: `Bearer ${token}` };
    }

    if (this.token && !this.user) {
      extraHTTPHeaders = { ...extraHTTPHeaders, Authorization: `Bearer ${this.token}` };
    }

    return await request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders
    });
  }
}
