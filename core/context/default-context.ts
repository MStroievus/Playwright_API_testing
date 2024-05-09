//? У Playwright є така річ як контекс. За допомогою контексту ми можемо виставляти baseURL, заголовки, наприклад, токен авторизації, proxy, timeout, докладніше почитайте https://playwright.dev/docs/api/class-apirequestcontext

//! Тут буде просто базовий контекст в якому ми передаємо лише нашу Base url 

import { request } from '@playwright/test';

export const getDefaultAPIContext = async () => {
  return await request.newContext({
    baseURL: process.env.BASE_URL
  });
};
