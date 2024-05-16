import { APIResponse } from "@playwright/test";
import { IDData } from "../../types/api/api-Interfaces/id-data";



export class GeneratedID {
  private static idData: IDData[] = [];

  static async storeID(response: APIResponse, id: string) {
    return this.idData.push({ response, id });
  }

  static async getIDForResponse(response: APIResponse): Promise<string | undefined> {
    const data = this.idData.find((item) => item.response === response);
    return data ? data.id : undefined;
  }

  static async deleteIDForResponse(response: APIResponse) {
    return this.idData = this.idData.filter((item) => item.response !== response);
  }
}