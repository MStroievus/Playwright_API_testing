import { APIRequestContext, APIResponse } from "@playwright/test";
import { APIRoutes } from "../../utils/constants/ApiRoutes";
import { APIClient } from "../../utils/types/API/context";
import { Login } from "../../utils/types/API/authentication";

export class AuthAPIClient implements APIClient {
  constructor(public context: APIRequestContext) {
  }

  async getAuthTokenApi(data: Login): Promise<APIResponse> {
    return await this.context.post(APIRoutes.LOGIN, { data });
  }

}
