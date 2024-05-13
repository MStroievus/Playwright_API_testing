import { APIResponse, expect, request } from "@playwright/test";
import { AuthUser } from "../../utils/types/api/Endpoints/LogInUser";
import { BaseAPIClient } from "./BaseAPIClient";
import { APIRoutes } from "../../utils/constants/Routes";

export class AuthAPIClient extends BaseAPIClient {

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

