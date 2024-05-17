import { JSONSchemaType } from "ajv";
import { AuthUser } from "../../types/api/endpoints/logInUser";

export class LogInUserRequestSchemas {
  public static logInUserSchema(): JSONSchemaType<AuthUser> {
    return {
      title: 'AddContact',
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ['email', 'password']
    };
  }
}


