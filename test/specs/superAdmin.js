/* eslint-disable no-undef */
/*const LoginPage = require('../pageobjects/loginPage.js');
const LandingPage = require('../pageobjects/landingPage.js');
const SuperAdminPage = require('../pageobjects/superAdminPage.js');
const LogoutPage = require('../pageobjects/logoutPage.js');

describe('SuperAdmins flow', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1366, 768);
    browser.url('https://nai-megarocket-app.vercel.app/landing');
  });

  it('login', async () => {
    await LandingPage.goToLogin();
    await expect(browser).toHaveUrlContaining('https://nai-megarocket-app.vercel.app/auth/login');
    await expect(LoginPage.eyeBtnPassword).toBeClickable();
    await LoginPage.login('superadmingmail.com', '');
    await LoginPage.clickOnBtnSubmit();
    await expect(LoginPage.errorMessageEmail).toBeDisplayed();
    await expect(LoginPage.errorMessagePassword).toBeDisplayed();
    await LoginPage.login('superadmin@gmail.com', 'Hotfixteam1!');
    await LoginPage.clickOnBtnSubmit();
  });

  it('Adding an Admin', async () => {
    await expect(SuperAdminPage.titleSuperAdmin).toBeDisplayed();
    await SuperAdminPage.btnAdd.click();
    await SuperAdminPage.fillAdminForm(
      'mirta',
      'Gimenez',
      '40404049',
      'Firebase2!',
      'mir@gmail.com',
      '1234432112',
      'miami'
    );
    await SuperAdminPage.clickOnSubmitBtn();
    await expect(browser).toHaveUrlContaining(
      'https://nai-megarocket-app.vercel.app/super-admins/admins'
    );
  });

  it('Changing Password and phone number', async () => {
    await SuperAdminPage.inputSearch.click();
    await SuperAdminPage.inputSearch.setValue('mirta');
    await SuperAdminPage.clickOnEditIcon();
    await SuperAdminPage.clickOnChangePasswordBtn();
    await expect(SuperAdminPage.btnEye).toBeClickable();
    await SuperAdminPage.changePassword('Firebase1!', 'Firebase1!');
    await SuperAdminPage.clickOnConfirmBtn();
    await SuperAdminPage.changePhoneNumber('40404011');
    await SuperAdminPage.clickOnSubmitBtn();
  });

  it('Deleting an Admin', async () => {
    await SuperAdminPage.inputSearch.click();
    await SuperAdminPage.searching('mirta');
    await SuperAdminPage.clickOnDeleteIcon();
    await expect(SuperAdminPage.modalSuperAdmin).toExist();
    await SuperAdminPage.clickOnConfirmDelete();
  });

  it('Logout', async () => {
    await LogoutPage.clickOnAvatarBtn();
    await expect(LogoutPage.dropDownMenu).toBeDisplayed();
    await LogoutPage.clickOnLogoutBtn();
    await expect(LogoutPage.btnLogoutModalCancel).toExist();
    await LogoutPage.clickOnConfirmLogoutBtn();
  });
});
*/
