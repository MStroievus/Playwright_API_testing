import { APIRequestContext, APIResponse } from '@playwright/test';
import { APIClient } from '../../utils/types/api/clients/APIClient';
import { error } from 'console';


export class BaseAPIClient implements APIClient {
  constructor(public context: APIRequestContext) {
  }


  protected handleErrors(error: Error): void {
    const errorJSON = { error: error.message };
    console.error(JSON.stringify(errorJSON));
  }


  public async error() {
    try {
      // Ваш код тут, наприклад, виклик API
    } catch (error) {
      this.handleErrors(error);
      throw error;
    }
  }
}
