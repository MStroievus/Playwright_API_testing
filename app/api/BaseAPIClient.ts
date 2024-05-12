import { APIRequestContext, APIResponse } from '@playwright/test';
import { APIClient } from '../../utils/types/api/clients/APIClient';

//?Ми створюємо базовий клас BaseAPIClient, який реалізує спільну логіку для всіх API клієнтів, наприклад, обробку помилок, логування тощо. Тоді інші API клієнти можуть успадковуватися від цього базового класу

export abstract class BaseAPIClient implements APIClient {
  constructor(public readonly context: APIRequestContext) { }

  protected async makeRequest(request: Promise<APIResponse>): Promise<APIResponse> {
    const response = await request;
    if (!response.ok()) {
      throw new Error(`API request failed with status ${response.status()}: ${response.statusText()}`);
    }
    return response;
  }
}
