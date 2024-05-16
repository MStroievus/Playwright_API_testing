import { APIResponse, expect, request } from "@playwright/test";
import { AuthUser } from "../../utils/types/api/Endpoints/logInUser";
import { BaseAPIClient } from "./base-api-client";
import { APIRoutes } from "../../utils/constants/api-routes";

export class UsersAPIClient extends BaseAPIClient {

  async getLogInUserAPI(data: AuthUser): Promise<APIResponse> {
    return await this.context.post(APIRoutes.Login, { data });
  }

  async getAPIToken(data: AuthUser) {
    const response = await this.context.post(APIRoutes.Login, { data }); // Сервер в тестовому проекті не встигає обробляти токени в паралелі
    const json = await response.json();
    expect(response.status()).toBe(200);
    return json.token;
  }


}

