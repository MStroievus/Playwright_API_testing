import { APIRequestContext, APIResponse } from '@playwright/test';
import { APIClient } from '../../utils/types/api/api-Interfaces/api-client';
import { APIRoutes } from '../../utils/constants/api-routes';

export class BaseAPIClient implements APIClient {
  private contactIds: string[] = [];
  private array = [1, 2, 2, 3, 4]

  constructor(public context: APIRequestContext) { }

  async getIDFromResponse(response: APIResponse): Promise<string> {
    const json = await response.json();
    return json._id;
  }

  addContactId(id: string) {
    this.contactIds.push(id);
  }

  async deleteAllContacts() {
    console.log('THERE yours ids ---->', this.contactIds, this.array)
    for (const id of this.contactIds) {
      await this.context.delete(`${APIRoutes.Contact}/${id}`);
    }
    this.contactIds = [];
  }
}
