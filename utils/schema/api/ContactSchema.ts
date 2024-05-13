import { JSONSchemaType } from "ajv";
import { AddContact } from "../../types/api/Endpoints/AddContact";

export const addContactSchema: JSONSchemaType<AddContact> = {
  title: 'AddContact',
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    birthdate: { type: "string" },
    email: { type: "string" },
    phone: { type: "number" },
    street1: { type: "string" },
    street2: { type: "string" },
    city: { type: "string" },
    stateProvince: { type: "string" },
    postalCode: { type: "number" },
    country: { type: "string" },
  },
  required: ["firstName", "lastName", "birthdate", "email", "phone", "street1", "street2", "city", "stateProvince", "postalCode", "country"]
};