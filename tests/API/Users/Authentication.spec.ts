
import { test, expect } from "@playwright/test"
import { AuthAPIClient } from "../../../app/api/AuthAPIClient"


test('Log in User', async ({ request }) => {
  const api = new AuthAPIClient(request)

  const data = { "email": "tomato_gn1@i.ua", "password": "CreataMaX" }
  const response = await api.getAuthTokenApi(data)
  console.log(await response.json())
  expect(response).toBeOK()


})



