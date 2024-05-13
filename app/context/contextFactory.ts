import { APIRequestContext, request } from "@playwright/test";
import { AuthAPIClient } from "../api/AuthAPIClient";
import { APIContext } from "../../utils/types/api/clients/APIContext";
import { DefaultAPIContext } from "./BaseContext";
//! Патерн Фабричний метод пропонує відмовитись від безпосереднього створення об’єктів за допомогою оператора new, замінивши його викликом особливого фабричного методу.

//?Основна ідея фабричного методу полягає в тому, що він абстрагує процес створення об'єктів від самого коду, який їх використовує. Це дозволяє легко вводити нові типи об'єктів без зміни коду, який їх використовує, підвищуючи гнучкість та розширюваність системи.

export class APIContextFactory {
  static async createContext(context: APIContext): Promise<APIRequestContext> {
    return await context.createContext();
  }

  static async createAuthClient(): Promise<AuthAPIClient> {
    const defaultContext = await this.createContext(new DefaultAPIContext());
    return new AuthAPIClient(defaultContext);

  }
}
