import { APIRequestContext, request } from '@playwright/test';
import { APIContext } from '../../utils/types/api/clients/APIContext';
//? Якщо метод createAPIContext() не має залежностей від будь-яких екземплярів класу або стану, то його можна викликати без створення об'єкту класу. Це спрощує використання класу, оскільки немає необхідності створювати екземпляр класу перед викликом методу.

//! newContext() - Створює нові екземпляри APIRequestContext .

export class DefaultAPIContext implements APIContext {
  async createContext(): Promise<APIRequestContext> {
    return await request.newContext({
      baseURL: process.env.BASE_URL
    });
  }
}

