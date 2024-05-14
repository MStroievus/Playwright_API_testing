import { APIRequestContext } from '@playwright/test';
//?Цей API використовується для тестування Web API. Ви можете використовувати його, щоб запускати кінцеві точки API, налаштовувати мікросервіси, готувати середовище або службу для тестування e2e.Кожен контекст браузера Playwright пов’язаний із ним екземпляром APIRequestContext , який ділиться сховищем файлів cookie з контекстом веб-переглядача та доступ до якого можна отримати через browserContext.request або page.request . Також можна створити новий екземпляр APIRequestContext вручну, викликавши apiRequest.newContext() .
//! https://playwright.dev/docs/api/class-apirequestcontext



export interface APIClient {
  context: APIRequestContext;
}