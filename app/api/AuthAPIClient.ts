import { APIResponse, request } from "@playwright/test";
import { AuthUser } from "../../utils/types/api/Endpoints/LogInUser";
import { BaseAPIClient } from "./BaseAPIClient";
import { APIRoutes } from "../../utils/constants/Routes";

export class AuthAPIClient extends BaseAPIClient {



  async getLogInUserAPI(data: AuthUser): Promise<APIResponse> {
    return await this.context.post(APIRoutes.Login, { data })
  }


}