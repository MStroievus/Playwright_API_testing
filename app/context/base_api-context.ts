import test, { APIRequestContext, request } from "@playwright/test";

// This BaseAPIContext class provides a foundation for creating API contexts.
// It handles base URL and HTTP headers setup, and includes a method to create
// a new APIRequestContext with configured settings and error handling.

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
    return await test.step('Create API context', async () => {
      try {
        return await request.newContext({
          baseURL: this.baseURL,
          extraHTTPHeaders: this.extraHTTPHeaders
        });
      } catch (error) {
        console.error('Failed to create API context:', error);
        throw error;
      }
    });
  }
}
