import { APIResponse } from '@playwright/test';
import { APIRoutes } from '../../utils/constants/api-routes';
import { BaseAPIClient } from './base-api-client';
import { UpdateContact } from '../../utils/types/api/Endpoints/UpdateContact';

export class ContactAPIClient extends BaseAPIClient {
  async addContact(data): Promise<APIResponse> {                        // AddContact
    return await this.context.post(APIRoutes.Contact, { data })
  }

  async getContactList() {
    return await this.context.get(APIRoutes.Contact);
  }

  async getContact(id: string): Promise<APIResponse> {
    return await this.context.get(`${APIRoutes.Contact}/${id}`);
  }
  async updateContactList(id: string, data: UpdateContact) {
    return await this.context.put(`${APIRoutes.Contact}/${id}`, { data });
  }

  async deleteContact(id: string) {
    return await this.context.delete(`${APIRoutes.Contact}/${id}`);
  }
}

