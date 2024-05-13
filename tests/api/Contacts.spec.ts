import test, { expect } from '@playwright/test';
import { ContactAPIClient } from '../../app/api/ContacAPIClient';
import { AddContact } from '../../utils/types/api/Endpoints/AddContact';
import { APIContextFactory } from '../../app/context/contextFactory';
import { AuthenticatedAPIContext } from '../../app/context/AuthorizatedContext';
import { UpdateContact } from '../../utils/types/api/Endpoints/UpdateContact';
import playwrightApiMatchers from 'odottaa';
expect.extend(playwrightApiMatchers);

const userAuth = {
  email: 'tomato_gn1@i.ua',
  password: 'CreataMaX'
};

const contact: AddContact = {
  firstName: 'asdasdasdasd',
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
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNTIzMjk5ZWY4YTAwMTNlZGY4ZjUiLCJpYXQiOjE3MTU1MDI3MDV9.vzjSgxQhnAu9zEKR0eiKy6MyEeY8X4A-P2g85wVw-JM';



test.describe('Add Contact ', async () => {

  test('Add Contact with valid credentials', async ({ }) => {
    const authenticatedContext = await APIContextFactory.createContext(new AuthenticatedAPIContext(userAuth));
    const contactAPIClient = new ContactAPIClient(authenticatedContext);
    const response = await contactAPIClient.addContact(contact);
    expect(response).toHaveStatusCode(201)
    expect(response).toHaveStatusText('Created')

  });

  test('Get Contact List with valid credentials', async ({ }) => {
    const authenticatedContext = await APIContextFactory.createContext(new AuthenticatedAPIContext(userAuth));
    const contactAPIClient = new ContactAPIClient(authenticatedContext);
    const response = await contactAPIClient.getContactList();
    console.log(await response.json());

  });

  test('Get Contact with valid credentials', async ({ }) => {
    const authenticatedContext = await APIContextFactory.createContext(new AuthenticatedAPIContext(userAuth));
    const contactAPIClient = new ContactAPIClient(authenticatedContext);
    const id = await contactAPIClient.getIDContact(contact);
    const response = await contactAPIClient.getContact(id)
    console.log(await response.json())
  });


  test('Update Contact with valid credentials', async ({ }) => {
    const authenticatedContext = await APIContextFactory.createContext(new AuthenticatedAPIContext(userAuth));
    const contactAPIClient = new ContactAPIClient(authenticatedContext);
    const id = await contactAPIClient.getIDContact(contact);
    console.log(id)
    const response = await contactAPIClient.updateContactList(id, data1);
    console.log(await response.json());
  });


  test('Delete Contact with valid credentials', async ({ }) => {
    const authenticatedContext = await APIContextFactory.createContext(new AuthenticatedAPIContext(userAuth));
    const contactAPIClient = new ContactAPIClient(authenticatedContext);
    const id = await contactAPIClient.getIDContact(contact);
    console.log(id)
    const response = await contactAPIClient.deleteContact(id);
    console.log(response);
  });

});
