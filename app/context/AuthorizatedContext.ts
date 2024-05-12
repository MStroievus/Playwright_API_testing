import { APIRequestContext, request } from '@playwright/test';
import { AuthUser } from '../../utils/types/api/Endpoints/LogInUser';
import { APIContextFactory } from './contextFactory';
import { APIContext } from '../../utils/types/api/clients/APIContext';

export class AuthenticatedAPIContext implements APIContext {
  constructor(private user?: AuthUser, private authToken?: string) { }

  async createContext(): Promise<APIRequestContext> {
    let extraHTTPHeaders: { [key: string]: string } = {
      accept: '*/*',
      'Content-Type': 'application/json'
    };

    if (!this.user && !this.authToken) {
      throw Error('Provide "user" or "authToken"');
    }

    if (this.user && !this.authToken) {
      const authClient = await APIContextFactory.createAuthClient();
      const token = await authClient.getAPIToken(this.user);
      extraHTTPHeaders = { ...extraHTTPHeaders, Authorization: `Bearer ${token}` };
    }

    if (this.authToken && !this.user) {
      extraHTTPHeaders = { ...extraHTTPHeaders, Authorization: `Bearer ${this.authToken}` };
    }

    return await request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders
    });
  }
}
