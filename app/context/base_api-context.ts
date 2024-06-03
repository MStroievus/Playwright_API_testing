import { APIRequestContext, request } from "@playwright/test";

export class BaseAPIContext {
  protected baseURL: string;
  protected extraHTTPHeaders: { [key: string]: string };

  constructor(baseURL: string, extraHTTPHeaders: { [key: string]: string } = {}) {
    if (!baseURL) {
      throw new Error('BASE_URL environment variable is not set');
    }
    this.baseURL = baseURL;
    this.extraHTTPHeaders = {
      accept: '*/*',
      'Content-Type': 'application/json',
      ...extraHTTPHeaders
    };
  }

  async createContext(): Promise<APIRequestContext> {
    return await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: this.extraHTTPHeaders
    });
  }
}
