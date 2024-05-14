import { APIRequestContext, request } from "@playwright/test";
import { AuthAPIClient } from "../api/AuthAPIClient";
import { APIContext } from "../../utils/types/api/clients/APIContext";
import { DefaultAPIContext } from "./BaseContext";
import { ApiAuth, AuthUser } from "../../utils/types/api/Endpoints/LogInUser";
import { AuthenticatedAPIContext } from './AuthorizedContext'
//! Патерн Фабричний метод пропонує відмовитись від безпосереднього створення об’єктів за допомогою оператора new, замінивши його викликом особливого фабричного методу.

//?Основна ідея фабричного методу полягає в тому, що він абстрагує процес створення об'єктів від самого коду, який їх використовує. Це дозволяє легко вводити нові типи об'єктів без зміни коду, який їх використовує, підвищуючи гнучкість та розширюваність системи.


// Моя ідея полягає в тому, що в наc може бути багато контекстів, з різними хедерами, різними можливостями входу, не тільки через bearer token і тд, для цього нам треба створити кожен контекст окремо, але генерувати їх можна ізольовано через факторі, який не знає про  реалізацію, але лише створює існуючі контексти, це зробить написання тестів, фікстур та прекондішинів значно простішим.

export class APIContextFactory {
  static async contextFactory(selectedContext: string, data: ApiAuth = {}) {
    switch (selectedContext) {
      case 'AuthContext':
        return await this.createContext(new AuthenticatedAPIContext(data));
      case 'BaseContext':
        return await this.createContext(new DefaultAPIContext());
      default:
        throw new Error('Provide context');
    }
  }

  private static async createContext(context: APIContext): Promise<APIRequestContext> {
    return await context.createContext();
  }
}
