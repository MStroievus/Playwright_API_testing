import { faker } from "@faker-js/faker";
import { AddContactEndpoint } from "../../types/api/endpoints/addContact";


export class AddContactBuilder {
  private addContact: Partial<AddContactEndpoint> = {

  };

  // generate - змінити назву і переробити  логіку
  setFirstName() {
    this.addContact.firstName = faker.person.firstName();
    return this;
  }

  setLastName() {
    this.addContact.lastName = faker.person.lastName();
    return this;
  }

  setBirthdate() {
    this.addContact.birthdate = faker.date.past().toISOString().split('T')[0]!;
    return this;
  }

  setPhone() {
    this.addContact.phone = faker.number.int({ min: 1000000, max: 9999999 })!
    return this;
  }

  setEmail() {
    this.addContact.email = faker.internet.email().toLowerCase()!;
    return this;
  }

  setStreet1() {
    this.addContact.street1 = faker.location.streetAddress()!;
    return this;
  }

  setStreet2() {
    this.addContact.street2 = faker.location.secondaryAddress()!;
    return this;
  }

  setCity() {
    this.addContact.city = faker.location.city()!;
    return this;
  }

  setStateProvince() {
    this.addContact.stateProvince = faker.location.state()!
    return this;
  }

  setPostalCode() {
    this.addContact.postalCode = faker.number.int({ min: 10000, max: 99999 })!
    return this;
  }

  setCountry() {
    this.addContact.country = faker.location.county()!;
    return this;
  }


  // забрати
  fullObject() {
    return this
      .setFirstName()
      .setLastName()
      .setBirthdate()
      .setPhone()
      .setEmail()
      .setStreet1()
      .setStreet2()
      .setCity()
      .setStateProvince()
      .setPostalCode()
      .setCountry();
  }



  build(): Partial<AddContactEndpoint> {
    return this.addContact;
  }


}








