import { APIRequestContext, request } from '@playwright/test';
import { APIAuth } from '../utils/types/api/authentication';
import AuthAPIClient from './AuthAPIClient';

class AuthAPIContext {
  static async create({ user, authToken }: APIAuth, authClient: AuthAPIClient): Promise<APIRequestContext> {
    let extraHTTPHeaders: { [key: string]: string } = {
      accept: '*/*',
      'Content-Type': 'application/json'
    };

    if (!user && !authToken) {
      throw Error('Provide "user" or "authToken"');
    }

    if (user && !authToken) {
      const token = await authClient.getAuthToken(user);
      extraHTTPHeaders = { ...extraHTTPHeaders, Authorization: `Token ${token}` };
    }

    if (authToken && !user) {
      extraHTTPHeaders = { ...extraHTTPHeaders, Authorization: `Token ${authToken}` };
    }

    return await request.newContext({
      baseURL: process.env.BASE_URL,
      extraHTTPHeaders
    });
  }
}

export default AuthAPIContext;