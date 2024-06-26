import { APIRequestContext } from '@playwright/test';

// This file defines an APIClient interface for API testing.
// It utilizes Playwright's APIRequestContext for making API requests.
// The interface ensures that implementing classes have a context property of type APIRequestContext.

//?Цей API використовується для тестування Web API. Ви можете використовувати його, щоб запускати кінцеві точки API, налаштовувати мікросервіси, готувати середовище або службу для тестування e2e.Кожен контекст браузера Playwright пов’язаний із ним екземпляром APIRequestContext , який ділиться сховищем файлів cookie з контекстом веб-переглядача та доступ до якого можна отримати через browserContext.request або page.request . Також можна створити новий екземпляр APIRequestContext вручну, викликавши apiRequest.newContext() .

//! https://playwright.dev/docs/api/class-apirequestcontext



export interface APIClient {
  readonly context: APIRequestContext;
}


