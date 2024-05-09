import { APIRequestContext, APIResponse } from "@playwright/test";
import { APIRoutes } from "../../utils/constants/ApiRoutes";
import { APIClient } from "../../utils/types/API/context";
import { Login } from "../../utils/types/API/authentication";

export class AuthAPIClient implements APIClient {
  constructor(public context: APIRequestContext) {
  }

  async getAuthTokenApi(data: Login): Promise<APIResponse> {
    return await this.context.post(APIRoutes.Login, { data });
  }

  async getAuthToken(data: Login): Promise<string> {
    const response = await this.getAuthTokenApi(data)
    const json = await response.json();
    return json.token;
  }

}
