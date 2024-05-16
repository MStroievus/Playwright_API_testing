import { APIRequestContext, APIResponse } from '@playwright/test';
import { APIClient } from '../../utils/types/api/clients/api-client';


export class BaseAPIClient implements APIClient {
  constructor(public context: APIRequestContext) {
  }

  async getIDFromResponse(response: APIResponse): Promise<string> {
    const json = await response.json();
    return json._id
  }
}
