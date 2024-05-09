import { APIRequestContext, APIResponse } from "@playwright/test";
import { APIClient } from "../../utils/types/API/context";
import { APIRoutes } from "../../utils/constants/ApiRoutes";
import { AddContact } from "../../utils/types/API/addContact";

export class ContactAPIClient implements APIClient {
  constructor(public context: APIRequestContext) {
  }

  async AddContactAPI(data: AddContact): Promise<APIResponse> {
    const token: string = ''
    return await this.context.post(APIRoutes.Contact, {
      data, headers: {
        Authorization: `Bearer  ${token}`
      }
    });
  }

}
