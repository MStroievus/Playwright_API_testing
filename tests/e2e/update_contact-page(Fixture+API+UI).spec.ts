import { test } from '../../app/fixture/add_contact-fixture'
import { AddContactPageModel } from '../../app/utils/model/add_contact_page-model';


test.describe('Edit contact contact', () => {
  test('Edit contact with fixture and API', { tag: ['@fixture', '@regression', '@smoke'] }, async (
    { withLogin, contactAPIClient, builder, contactListPage, contactDetailPage, editContactPage, page }) => {
    const data1 = builder.fullObject().build()
    const data2 = builder.fullObject().build()
    await contactAPIClient.addContact(data1)
    await page.reload()
    await page.waitForTimeout(1000)
    await contactListPage.clickOnCreatedContact(data1 as AddContactPageModel)
    await contactDetailPage.getButtonByName('Edit Contact').click()
    await editContactPage.clearForm()
    await editContactPage.fillForm(data2 as AddContactPageModel)
    await editContactPage.getButtonByName('Submit').click()
    await contactDetailPage.checkUpdatedData(data2 as AddContactPageModel)
  });

});


// test.use({ userToLogin: 'admin' });
// Ця фікстура сетить сторедж, який не працює тут  тому для прикладу лише це просто тут
// test('Edit contact with fixture and API', { tag: ['@fixture', '@regression', '@smoke'] }, async ({ storageState, page }) => {
//   await page.goto(PageUrl.homePage)
//  })



