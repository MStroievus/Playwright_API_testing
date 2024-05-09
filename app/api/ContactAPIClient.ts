import { APIRequestContext, APIResponse } from "@playwright/test";
import { APIClient } from "../../utils/types/API/context";
import { APIRoutes } from "../../utils/constants/ApiRoutes";
import { AddContact } from "../../utils/types/api/AddContact";

export class ContactAPIClient implements APIClient {
  constructor(public context: APIRequestContext, public token: string) {
  }

  async AddContactAPI(data: AddContact): Promise<APIResponse> {
    const options = {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      data: data
    };
    return await this.context.post(APIRoutes.Contact, options);
  }
}
