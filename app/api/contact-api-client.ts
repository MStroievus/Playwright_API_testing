import { APIResponse } from "@playwright/test";
import { APIRoutes } from "../utils/constants/api-routes";
import { UpdateContactEndpoint } from "../utils/types/api/endpoints/UpdateContact";
import { BaseAPIClient } from "./base-api-client";
import { AddContactEndpoint } from "../utils/types/api/endpoints/addContact";


export class ContactAPIClient extends BaseAPIClient {
  async addContact(data: Partial<AddContactEndpoint>): Promise<APIResponse> {    //?  partial<T> https://www.typescriptlang.org/docs/handbook/utility-types.html 
    const response = await this.context.post(APIRoutes.Contact, { data });
    console.log(await response.json())
    const id = await this.getIDFromResponse(response);
    this.addID(id);
    return response;
  }

  async getContactList(): Promise<APIResponse> {
    return await this.context.get(APIRoutes.Contact);
  }

  async getContact(id: string): Promise<APIResponse> {
    return await this.context.get(`${APIRoutes.Contact}/${id}`);
  }
  async updateContactList(id: string, data: UpdateContactEndpoint): Promise<APIResponse> {
    return await this.context.put(`${APIRoutes.Contact}/${id}`, { data });
  }

  async deleteContact(id: string) {
    return await this.context.delete(`${APIRoutes.Contact}/${id}`);
  }
}
