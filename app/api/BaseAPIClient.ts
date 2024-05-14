import { APIRequestContext, APIResponse } from '@playwright/test';
import { APIClient } from '../../utils/types/api/clients/APIClient';
import { error } from 'console';


export class BaseAPIClient implements APIClient {
  constructor(public context: APIRequestContext) {
  }

  async getIDFromResponse(response: APIResponse): Promise<string> {
    const json = await response.json();
    return json._id
  }
}
