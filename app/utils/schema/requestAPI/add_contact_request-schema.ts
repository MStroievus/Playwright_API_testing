import { JSONSchemaType } from "ajv";
import { AddContactEndpoint } from "../../types/api/endpoints/AddContact";

export class AddContactRequestSchemas {

  public static addContactSchema(): JSONSchemaType<AddContactEndpoint> {
    return {
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
  }

}