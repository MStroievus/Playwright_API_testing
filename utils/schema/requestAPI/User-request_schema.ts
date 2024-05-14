import { JSONSchemaType } from "ajv";
import { AuthUser } from "../../types/api/Endpoints/LogInUser";

export const LogInUserSchema: JSONSchemaType<AuthUser> = {
  title: 'AddContact',
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ['email', 'password']
};