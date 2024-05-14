import { JSONSchemaType } from "ajv";
import { AddContact } from "../../types/api/Endpoints/AddContact";

export const addContactSchema: JSONSchemaType<AddContact> = {
  title: 'AddContact',
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    birthdate: { type: "string", nullable: true },
    email: { type: "string", nullable: true },
    phone: { type: "number", nullable: true },
    street1: { type: "string", nullable: true },
    street2: { type: "string", nullable: true },
    city: { type: "string", nullable: true },
    stateProvince: { type: "string", nullable: true },
    postalCode: { type: "number", nullable: true },
    country: { type: "string", nullable: true },
  },
  required: ["firstName", "lastName",]
};