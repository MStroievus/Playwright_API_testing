import { faker } from '@faker-js/faker';

// export class AddContactPageModel {
//   constructor(
//     public firstName: string,
//     public lastName: string,
//     public birthDate: string,
//     public email: string,
//     public phone: number,
//     public street1: string,
//     public street2: string,
//     public city: string,
//     public stateProvince: string,
//     public postalCode: number,
//     public country: string,
//   ) { }
// }


// export const formsData = new AddContactPageModel(
//   faker.person.firstName(),
//   faker.person.lastName(),
//   faker.date.past().toISOString().split('T')[0],
//   faker.internet.email().toLowerCase(),
//   faker.number.int({ min: 1000000, max: 9999999 }),
//   faker.location.streetAddress(),
//   faker.location.secondaryAddress(),
//   faker.location.city(),
//   faker.location.state(),
//   faker.number.int({ min: 10000, max: 99999 }),
//   faker.location.country(),
// );

// export const formsData2 = new AddContactPageModel(
//   faker.person.firstName(),
//   faker.person.lastName(),
//   faker.date.past().toISOString().split('T')[0],
//   faker.internet.email(),
//   faker.number.int({ min: 1000000, max: 9999999 }),
//   faker.location.streetAddress(),
//   faker.location.secondaryAddress(),
//   faker.location.city(),
//   faker.location.state(),
//   faker.number.int({ min: 10000, max: 99999 }),
//   faker.location.country(),
// );

// Або більше по ООП )


export class AddContactPageModel {
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  phone: number;
  street1: string;
  street2: string;
  city: string;
  stateProvince: string;
  postalCode: number;
  country: string;

  constructor() {
    this.generateRandomData();
  }

  private generateRandomData(): void {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.birthdate = faker.date.past().toISOString().split('T')[0];
    this.email = faker.internet.email().toLowerCase();
    this.phone = faker.number.int({ min: 1000000, max: 9999999 });
    this.street1 = faker.location.streetAddress();
    this.street2 = faker.location.secondaryAddress();
    this.city = faker.location.city();
    this.stateProvince = faker.location.state();
    this.postalCode = faker.number.int({ min: 10000, max: 99999 });
    this.country = faker.location.country();
  }

  regenerate(): void {
    this.generateRandomData();
  }
}

export class TestDataGenerator {
  static createContactData(): AddContactPageModel {
    return new AddContactPageModel();
  }
}