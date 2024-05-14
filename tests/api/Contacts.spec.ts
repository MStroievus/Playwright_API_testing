import test, { expect } from '@playwright/test';
import { ContactAPIClient } from '../../app/api/ContacAPIClient';
import { AddContact } from '../../utils/types/api/Endpoints/AddContact';
import { APIContextFactory } from '../../app/context/ContextFactory';
import { UpdateContact } from '../../utils/types/api/Endpoints/UpdateContact';
import playwrightApiMatchers from 'odottaa';
import { addContactSchema as addContactRequestSchema } from '../../utils/schema/requestAPI/Contact-request_schema';
import { ApiContext } from '../../utils/constants/Contexts';
import { AuthUser } from '../../utils/types/api/Endpoints/LogInUser';
import { AddContactResponseSchema } from '../../utils/schema/responseAPI/Contact-response_schema';
import { Validation } from '../../utils/schema/Validator'
expect.extend(playwrightApiMatchers);

const userAuth: AuthUser = {
  email: 'tomato_gn1@i.ua',
  password: 'CreataMaX'
};

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

const data1: UpdateContact = {
  firstName: '111111',
  lastName: 'Doe',
  birthdate: '1970-01-01',
  email: 'jdoe@fake.com',
  phone: 8005555555,
  street1: '1 Main St.',
  street2: 'Apartment A',
  city: 'Anytown',
  stateProvince: 'KS',
  postalCode: 12345,
  country: 'USA'
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNTIzMjk5ZWY4YTAwMTNlZGY4ZjUiLCJpYXQiOjE3MTU2NzA3NzV9.RAYOke5F7CtLEauibXzbBEW_VrnTV54AfJz8W6smsHU';



test.describe('Add Contact ', async () => {

  test('Add Contact with valid credentials', async ({ }) => {
    const authenticatedContext = await APIContextFactory.contextFactory(ApiContext.AuthContext, { user: userAuth });
    const contactAPIClient = new ContactAPIClient(authenticatedContext);
    const validation = new Validation()

    const response = await contactAPIClient.addContact(contact);
    expect(response).toHaveStatusCode(201)
    expect(response).toHaveStatusText('Created')
    await validation.requestValidateSchema({ schema: addContactRequestSchema, json: contact })
    await validation.responseValidationSchema({ schema: AddContactResponseSchema, response: response })


    const contactID = await contactAPIClient.getIDFromResponse(response)
    await contactAPIClient.deleteContact(contactID)
  });

  // test('Get Contact List with valid credentials', async ({ }) => {
  //   const authenticatedContext = await APIContextFactory.contextFactory(ApiContext.AuthContext, { user: userAuth });
  //   const contactAPIClient = new ContactAPIClient(authenticatedContext);



  //   const response = await contactAPIClient.getContactList();
  //   expect(response).toHaveStatusCode(200)
  //   expect(response).toHaveStatusText('OK')

  // });

  //   test('Get Contact with valid credentials', async ({ }) => {
  //     const authenticatedContext = await APIContextFactory.createContext(new AuthenticatedAPIContext(userAuth));
  //     const contactAPIClient = new ContactAPIClient(authenticatedContext);
  //     const id = await contactAPIClient.getIDContact(contact);
  //     const response = await contactAPIClient.getContact(id)
  //     console.log(await response.json())
  //   });


  //   test('Update Contact with valid credentials', async ({ }) => {
  //     const authenticatedContext = await APIContextFactory.createContext(new AuthenticatedAPIContext(userAuth));
  //     const contactAPIClient = new ContactAPIClient(authenticatedContext);
  //     const id = await contactAPIClient.getIDContact(contact);
  //     console.log(id)
  //     const response = await contactAPIClient.updateContactList(id, data1);
  //     console.log(await response.json());
  //   });


  //   test('Delete Contact with valid credentials', async ({ }) => {
  //     const authenticatedContext = await APIContextFactory.createContext(new AuthenticatedAPIContext(userAuth));
  //     const contactAPIClient = new ContactAPIClient(authenticatedContext);
  //     const id = await contactAPIClient.getIDContact(contact);
  //     console.log(id)
  //     const response = await contactAPIClient.deleteContact(id);
  //     console.log(response);
  //   });

});
