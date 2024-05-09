import { expect, test } from '@playwright/test';
import { APIRoutes } from '../../utils/constants/ApiRoutes';

require('dotenv').config();

test('User Login', async ({ request }) => {
  const loginData = {
    "email": "tomato_gn1@i.ua",
    "password": "CreataMaX"
  };

  const response = await request.post(APIRoutes.LOGIN, {
    data: loginData
  });

  expect(response).toBeOK();
  const responseData = await response.json();
  const token = responseData.token
  console.log(token)
});
