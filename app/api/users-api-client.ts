import { APIResponse, expect } from "@playwright/test";
import { AuthUser } from "../utils/types/api/endpoints/LogInUser";
import { BaseAPIClient } from "./base-api-client";
import { APIRoutes } from "../utils/constants/api-routes";


// This UsersAPIClient class handles user authentication operations.
// It provides methods for user login and API token retrieval.
// The class includes a timeout mechanism to manage parallel token generation in tests.

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

