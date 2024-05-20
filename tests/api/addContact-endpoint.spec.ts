import { expect } from '@playwright/test';
import { AddContact } from '../../utils/types/api/endpoints/addContact';
import { test } from '../../app/fixture/combineFixture/contact-api-fixture';
import '../../utils/extensions/extensions-expect';
import { AddContactRequestSchemas } from '../../utils/schema/requestAPI/add_contact_request-schema';
import { AddContactResponseSchemas } from '../../utils/schema/responseAPI/add_contact_response-schema';

test.describe('Add Contact endpoint with valid data', async () => {
  test(
    'Check status code Add Contact  endpoint with valid credentials',
    {
      tag: ['@smoke', '@api', '@regression']
    },
    async ({ contactAPIClient, builder }) => {
      const contact = builder.buildFullObject().build() as AddContact
      const response = await contactAPIClient.addContact(contact);
      expect(response).toHaveStatusCode(201);
      expect(response).toHaveStatusText('Created');
    }
  );

  test(
    'Check response Add Contact  endpoint with valid credentials',
    {
      tag: ['@smoke', '@api', '@regression']
    },
    async ({ contactAPIClient, validation, builder }) => {
      const contact = builder.setFirstName().setLastName().build() as AddContact;
      const response = await contactAPIClient.addContact(contact);

      await validation.requestValidateSchema({ schema: AddContactRequestSchemas.addContactSchema(), json: contact });
      await validation.responseValidationSchema({
        schema: AddContactResponseSchemas.addContactSchema(contact),
        response: response
      });
    }
  );

  test(
    `Check status with missing first name required field`,
    {
      tag: ['@api', '@regression']
    },
    async ({ contactAPIClient, builder }) => {
      const contact = builder.setLastName().build()
      const response = await contactAPIClient.addContact(contact);

      expect(response).toHaveStatusCode(400);
      expect(response).toHaveStatusText('Bad Request');
    }
  );

  test(
    `Check status with missing last name required field`,
    {
      tag: ['@api', '@regression']
    },
    async ({ contactAPIClient, builder }) => {
      const contact = builder.setFirstName().build()
      const response = await contactAPIClient.addContact(contact);

      expect(response).toHaveStatusCode(400);
      expect(response).toHaveStatusText('Bad Request');
    }
  );

  test(
    `Check response with missing first name required field`,
    {
      tag: ['@api', '@regression']
    },
    async ({ contactAPIClient, validation, builder }) => {
      const contact = builder.setLastName().build()
      const response = await contactAPIClient.addContact(contact);
      await validation.responseValidationSchema({
        schema: AddContactResponseSchemas.missingRequiredFieldErrorSchema('firstName'),
        response: response
      });
    }
  );
  test(
    `Check response with missing last name name required field`,
    {
      tag: ['@api', '@regression']
    },
    async ({ contactAPIClient, validation, builder }) => {
      const contact = builder.setFirstName().build()
      const response = await contactAPIClient.addContact(contact);
      await validation.responseValidationSchema({
        schema: AddContactResponseSchemas.missingRequiredFieldErrorSchema('lastName'),
        response: response
      });
    }
  );
});
