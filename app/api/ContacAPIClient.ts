import { APIResponse, expect } from '@playwright/test';
import { APIRoutes } from '../../utils/constants/Routes';
import { AddContact, AddContactWithID } from '../../utils/types/api/Endpoints/AddContact';
import { BaseAPIClient } from './BaseAPIClient';
import { UpdateContact } from '../../utils/types/api/Endpoints/UpdateContact';

export class ContactAPIClient extends BaseAPIClient {
  async addContact(data: AddContact): Promise<APIResponse> {
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

  async getIDFromContact(response: APIResponse): Promise<string> {
    const json = await response.json();
    return json._id
  }
}


