import { expect } from '@playwright/test';
import { AddContact } from '../../utils/types/api/Endpoints/addContact';
import { addContactSchema as addContactRequestSchema } from '../../utils/schema/requestAPI/contact_request-schema';
import { ValidationAddContactResponseSchema as VAL } from '../../utils/schema/responseAPI/contact_response-schema';
import { test } from '../../app/fixture/combineFixture/contact-api-fixture';
import '../../utils/extensions/extensions-expect'



const contact: AddContact = {
  firstName: 'asd2ew123',
  lastName: 'Dowqe',
  birthdate: '1970-01-01',
  email: 'jdoe@fake.com',
  phone: 432847923,
  street1: '1 Main St.',
  street2: 'Apartment A',
  city: 'Anytown',
  stateProvince: 'KS',
  postalCode: 12345,
  country: 'USA'
};

const contactFirstName = {
  field: 'firstName',
  userData: {
    lastName: 'Dowqe',
    birthdate: '1970-01-01',
    email: 'jdoe@fake.com',
    phone: 432847923,
    street1: '1 Main St.',
    street2: 'Apartment A',
    city: 'Anytown',
    stateProvince: 'KS',
    postalCode: 12345,
    country: 'USA'
  }
};

const contactLastName = {
  field: 'lastName',
  userData: {
    firstName: 'Dowqe',
    birthdate: '1970-01-01',
    email: 'jdoe@fake.com',
    phone: 432847923,
    street1: '1 Main St.',
    street2: 'Apartment A',
    city: 'Anytown',
    stateProvince: 'KS',
    postalCode: 12345,
    country: 'USA'
  }
};

const fields = [contactLastName, contactFirstName];


test.describe('Add Contact endpoint', async () => {

  test('Check status responce Add Contact  endpoint with valid credentials', {
    tag: ['@smoke', '@api', '@regression']
  }, async ({ authContactAPIClient }) => {
    const response = await authContactAPIClient.addContact(contact);

    expect(response).toHaveStatusCode(201)
    expect(response).toHaveStatusText('Created')

    const contactID = await authContactAPIClient.getIDFromResponse(response)
    await authContactAPIClient.deleteContact(contactID)
  });


  test('Check response fields Add Contact  endpoint with valid credentials', {
    tag: ['@smoke', '@api', '@regression']
  }, async ({ authContactAPIClient, validation }) => {
    const response = await authContactAPIClient.addContact(contact);

    await validation.requestValidateSchema({ schema: addContactRequestSchema, json: contact })
    await validation.responseValidationSchema({ schema: VAL.addContactResponseSchema(contact), response: response })

    const contactID = await authContactAPIClient.getIDFromResponse(response)
    await authContactAPIClient.deleteContact(contactID)
  });

  for (let data of fields) {
    test(`Check status with missing ${data.field} name required field`, {
      tag: ['@api', '@regression']
    }, async ({ authContactAPIClient }) => {
      const response = await authContactAPIClient.addContact(data.userData);

      expect(response).toHaveStatusCode(400)
      expect(response).toHaveStatusText('Bad Request')

      const contactID = await authContactAPIClient.getIDFromResponse(response)
      await authContactAPIClient.deleteContact(contactID)
    });
  }

  for (let data of fields) {
    test(`Check response with missing ${data.field} name required field`, {
      tag: ['@api', '@regression']
    }, async ({ authContactAPIClient, validation }) => {

      const response = await authContactAPIClient.addContact(data.userData);
      await validation.responseValidationSchema({ schema: VAL.missingRequiredFieldErrorResponseSchema(data.field), response: response })

      const contactID = await authContactAPIClient.getIDFromResponse(response)
      await authContactAPIClient.deleteContact(contactID)
    });
  }

});
