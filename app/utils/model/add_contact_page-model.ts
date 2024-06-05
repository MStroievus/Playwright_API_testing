import { faker } from '@faker-js/faker';

export class AddContactPageModel {
  constructor(
    public firstName: string,
    public lastName: string,
    public birthDate: string,
    public email: string,
    public phone: number,
    public street1: string,
    public street2: string,
    public city: string,
    public stateProvince: string,
    public postalCode: number,
    public country: string,
  ) { }
}


export const formsData = new AddContactPageModel(
  faker.person.firstName(),
  faker.person.lastName(),
  faker.date.past().toISOString().split('T')[0],
  faker.internet.email(),
  faker.number.int({ min: 1000000, max: 9999999 }),
  faker.location.streetAddress(),
  faker.location.secondaryAddress(),
  faker.location.city(),
  faker.location.state(),
  faker.number.int({ min: 10000, max: 99999 }),
  faker.location.country(),
);






