import { APIRequestContext, APIResponse } from '@playwright/test';
import { APIClient } from '../utils/types/api/api-interfaces/api-client';
import { APIRoutes } from '../utils/constants/api-routes';
import { test } from '@playwright/test';

export class BaseAPIClient implements APIClient {
  private contactIds: string[] = [];

  constructor(public context: APIRequestContext) {
    test.step(`Initialize APIRequestContext and contactIds array with context: ${context}`, async () => {
      this.context = context;
      this.contactIds = [];
    });
  }

  async getIDFromResponse(response: APIResponse): Promise<string> {
    return await test.step(`Get ID from response: ${response}`, async () => {
      const json = await response.json();
      return json._id;
    });
  }

  addID(id: string) {
    return test.step(`Add ID to contactIds with ID: ${id}`, async () => {
      this.contactIds.push(id);
    });
  }

  async deleteEntities() {
    return await test.step(`Delete all entities from contactIds: ${this.contactIds.join(', ')}`, async () => {
      for (const id of this.contactIds) {
        await this.context.delete(`${APIRoutes.Contact}/${id}`);
      }
      this.contactIds = [];
    });
  }
}
