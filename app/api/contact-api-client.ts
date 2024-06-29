import { APIResponse } from "@playwright/test";
import { APIRoutes } from "../utils/constants/api-routes";
import { UpdateContactEndpoint } from "../utils/types/api/endpoints/UpdateContact";
import { BaseAPIClient } from "./base-api-client";
import { AddContactEndpoint } from "../utils/types/api/endpoints/addContact";
import { test } from '@playwright/test';

export class ContactAPIClient extends BaseAPIClient {
  async addContact(data: Partial<AddContactEndpoint>): Promise<APIResponse> {
    return await test.step(`Add a new contact with data: ${JSON.stringify(data)}`, async () => {
      const response = await this.context.post(APIRoutes.Contact, { data });
      const id = await this.getIDFromResponse(response);
      this.addID(id);
      return response;
    });
  }

  async getContactList(): Promise<APIResponse> {
    return await test.step('Get list of contacts', async () => {
      return await this.context.get(APIRoutes.Contact);
    });
  }

  async getContact(id: string): Promise<APIResponse> {
    return await test.step(`Get a contact by ID: ${id}`, async () => {
      return await this.context.get(`${APIRoutes.Contact}/${id}`);
    });
  }

  async updateContactList(id: string, data: UpdateContactEndpoint): Promise<APIResponse> {
    return await test.step(`Update a contact with ID: ${id} using data: ${JSON.stringify(data)}`, async () => {
      return await this.context.put(`${APIRoutes.Contact}/${id}`, { data });
    });
  }

  async deleteContact(id: string) {
    return await test.step(`Delete a contact by ID: ${id}`, async () => {
      return await this.context.delete(`${APIRoutes.Contact}/${id}`);
    });
  }
}
