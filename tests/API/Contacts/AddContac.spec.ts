import { test, expect } from "@playwright/test"
import { ContactAPIClient } from "../../../app/api/ContactAPIClient"
import { AuthAPIClient } from "../../../app/api/AuthAPIClient"

test.describe("Contact", () => {
  test('Add contact endpoint', async ({ request }) => {
    const dataForToken = {
      "email": "tomato_gn1@i.ua",
      "password": "CreataMaX"
    }

    const data = {
      "firstName": "John",
      "lastName": "Doe",
      "birthdate": "1970-01-01",
      "email": "jdoe@fake.com",
      "phone": 8005555555,
      "street1": "1 Main St.",
      "street2": "Apartment A",
      "city": "Anytown",
      "stateProvince": "KS",
      "postalCode": 12345,
      "country": "USA"
    }

    const authContext = new AuthAPIClient(request)
    const token = await authContext.getAuthToken(dataForToken)
    const api = new ContactAPIClient(request, token)
    const response = await api.AddContactAPI(data)

    console.log(await response.json())





  })
})
