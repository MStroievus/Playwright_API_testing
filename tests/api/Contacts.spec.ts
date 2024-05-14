import test, { expect } from '@playwright/test';
import { ContactAPIClient } from '../../app/api/ContacAPIClient';
import { AddContact } from '../../utils/types/api/Endpoints/AddContact';
import { APIContextFactory } from '../../app/context/ContextFactory';
import { UpdateContact } from '../../utils/types/api/Endpoints/UpdateContact';
import playwrightApiMatchers from 'odottaa';
import { validateSchema } from '../../utils/schema/validator';
import { addContactSchema } from '../../utils/schema/api/ContactSchema';
import { ApiContext } from '../../utils/constants/Contexts';
import { AuthUser } from '../../utils/types/api/Endpoints/LogInUser';
expect.extend(playwrightApiMatchers);

const userAuth: AuthUser = {
  email: 'tomato_gn1@i.ua',
  password: 'CreataMaX'
};

const contact: AddContact = {
  firstName: 'asdasdasdasd',
  lastName: 'Doe',
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

    const response = await contactAPIClient.addContact(contact);
    expect(response).toHaveStatusCode(201)
    expect(response).toHaveStatusText('Created')
    await validateSchema({ schema: addContactSchema, json: contact })

    const contactID = await contactAPIClient.getIDFromResponse(response)
    const my = await contactAPIClient.deleteContact(contactID)
    console.log(my)
  });

  //   test('Get Contact List with valid credentials', async ({ }) => {
  //     const authenticatedContext = await APIContextFactory.createContext(new AuthenticatedAPIContext(userAuth));
  //     const contactAPIClient = new ContactAPIClient(authenticatedContext);
  //     const response = await contactAPIClient.getContactList();
  //     console.log(await response.json());

  //   });

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
