import { expect } from '@playwright/test';
import { ContactAPIClient } from '../../app/api/ContactAPIClient';
import { AddContact } from '../../utils/types/api/Endpoints/AddContact';
import { APIContextFactory } from '../../app/context/ContextFactory';
import playwrightApiMatchers from 'odottaa';
import { addContactSchema as addContactRequestSchema } from '../../utils/schema/requestAPI/Contact-request_schema';
import { ApiContext } from '../../utils/constants/Contexts';
//import { AuthUser } from '../../utils/types/api/Endpoints/LogInUser';
import { Validation } from '../../utils/schema/Validator'
import { ValidationAddContactResponseSchema } from '../../utils/schema/responseAPI/Contact-response_schema';
import { contextFixture } from '../../app/fixture/logicFixture/ContactFixture';
import { test } from '../../app/fixture/combineFixture/ContactAPI-fixture';

expect.extend(playwrightApiMatchers);

// const userAuth: AuthUser = {
//   email: 'tomato_gn1@i.ua',
//   password: 'CreataMaX'
// };

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



test.describe('Add Contact endpoint', async () => {

  test('Check status responce Add Contact  endpoint with valid credentials', {
    tag: ['@smoke', '@api', '@regression']
  }, async ({ }) => {
    const authenticatedContext = await APIContextFactory.contextFactory(ApiContext.AuthContext,);
    const contactAPIClient = new ContactAPIClient(authenticatedContext);

    const response = await contactAPIClient.addContact(contact);
    expect(response).toHaveStatusCode(201)
    expect(response).toHaveStatusText('Created')



    const contactID = await contactAPIClient.getIDFromResponse(response)
    await contactAPIClient.deleteContact(contactID)
  });


  test('Check response fields Add Contact  endpoint with valid credentials', {
    tag: ['@smoke', '@api', '@regression']
  }, async ({ contactAPIClient, validation }) => {
    // const authenticatedContext = await APIContextFactory.contextFactory(ApiContext.AuthContext, { user: userAuth });
    // const contactAPIClient = new ContactAPIClient(authenticatedContext);
    // const validation = new Validation()

    const response = await contactAPIClient.addContact(contact);
    console.log(await response.json())
    await validation.requestValidateSchema({ schema: addContactRequestSchema, json: contact })
    await validation.responseValidationSchema({ schema: ValidationAddContactResponseSchema.addContactResponseSchema(contact), response: response })


    const contactID = await contactAPIClient.getIDFromResponse(response)
    await contactAPIClient.deleteContact(contactID)
  });

  // const fields = [contactLastName, contactFirstName];
  // for (let user of fields) {
  //   test(`Check status with missing ${user.field} name required field`, {
  //     tag: ['@api', '@regression']
  //   }, async ({ }) => {
  //     const authenticatedContext = await APIContextFactory.contextFactory(ApiContext.AuthContext, { user: userAuth });
  //     const contactAPIClient = new ContactAPIClient(authenticatedContext);

  //     const response = await contactAPIClient.addContact(user.userData);
  //     expect(response).toHaveStatusCode(400)
  //     expect(response).toHaveStatusText('Bad Request')



  //     const contactID = await contactAPIClient.getIDFromResponse(response)
  //     await contactAPIClient.deleteContact(contactID)
  //   });
  // }



  // const usersData = [contactLastName, contactFirstName];
  // for (let user of usersData) {
  //   test(`Check response with missing ${user.field} name required field`, {
  //     tag: ['@api', '@regression']
  //   }, async ({ }) => {
  //     const authenticatedContext = await APIContextFactory.contextFactory(ApiContext.AuthContext, { user: userAuth });
  //     const contactAPIClient = new ContactAPIClient(authenticatedContext);
  //     const validation = new Validation()

  //     const response = await contactAPIClient.addContact(user.userData);
  //     await validation.responseValidationSchema({ schema: ValidationAddContactResponseSchema.missingRequiredFieldAddContactErrorResponseSchema(user.field), response: response })


  //     const contactID = await contactAPIClient.getIDFromResponse(response)
  //     await contactAPIClient.deleteContact(contactID)
  //   });
  // }

});
