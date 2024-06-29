/* eslint-disable prefer-const */
import { APIRequestContext, request } from '@playwright/test';
import { ApiAuth, AuthUser } from '../utils/types/api/endpoints/LogInUser';
import { BaseAPIContext } from './base_api-context';
import { UsersAPIClient } from '../api/users-api-client';
import { test } from '@playwright/test';

export class AuthenticatedAPIContext extends BaseAPIContext {
  protected user?: AuthUser;
  protected token?: string;

  constructor(baseURL: string, { user, token }: ApiAuth) {
    super(baseURL);
    this.user = user;
    this.token = token;
  }

  async createContext(): Promise<APIRequestContext> {
    return await test.step('Create authenticated API context', async () => {
      let extraHTTPHeaders = { ...this.extraHTTPHeaders };

      if (!this.user && !this.token) {
        throw new Error('Provide "user" or "authToken"');
      }

      if (this.user && !this.token) {
        const defaultContext = await super.createContext();
        const authClient = new UsersAPIClient(defaultContext);
        this.token = await authClient.getAPIToken(this.user);
        extraHTTPHeaders.Authorization = `Bearer ${this.token}`;
      }

      if (this.token && !this.user) {
        extraHTTPHeaders.Authorization = `Bearer ${this.token}`;
      }

      return await request.newContext({
        baseURL: this.baseURL,
        extraHTTPHeaders
      });
    });
  }
}
