import { test, expect } from "@playwright/test"
import { ContactAPIClient } from "../../../core/api/ContactAPIClient"
import { AuthAPIClient } from "../../../core/api/AuthAPIClient"

test.describe("Contact", () => {
  test('Add contact endpoint', async ({ request }) => {
    const api = new ContactAPIClient(request)
    const authContext = new AuthAPIClient(request)
    const dataForToken = {
      "email": "tomato_gn1@i.ua",
      "password": "CreataMaX"
    }

    const data = {
      "firstName": "John",
      "lastName": "Doe",
      "birthdate": new Date(1970, 0, 1),
      "email": "jdoe@fake.com",
      "phone": 8005555555,
      "street1": "1 Main St.",
      "street2": "Apartment A",
      "city": "Anytown",
      "stateProvince": "KS",
      "postalCode": 12345,
      "country": "USA"
    }
    const authResponse = await authContext.getAuthToken(dataForToken)


  })
})
