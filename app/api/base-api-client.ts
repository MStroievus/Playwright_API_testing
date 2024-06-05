import { APIRequestContext, APIResponse } from '@playwright/test';
import { APIClient } from '../utils/types/api/api-interfaces/api-client';
import { APIRoutes } from '../utils/constants/api-routes';

export class BaseAPIClient implements APIClient {
  private contactIds: string[] = [];

  constructor(public context: APIRequestContext) { }

  async getIDFromResponse(response: APIResponse): Promise<string> {
    const json = await response.json();
    return json._id;
  }

  addID(id: string) {
    this.contactIds.push(id);
  }

  async deleteEntities() {
    for (const id of this.contactIds) {
      await this.context.delete(`${APIRoutes.Contact}/${id}`);
    }
    this.contactIds = [];
  }
}
