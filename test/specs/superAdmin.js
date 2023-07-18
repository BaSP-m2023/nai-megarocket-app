/* eslint-disable no-undef */
const LoginPage = require('../pageobjects/loginPage.js');
const LandingPage = require('../pageobjects/landingPage.js');
const SuperAdminPage = require('../pageobjects/superAdminPage.js');
const LogoutPage = require('../pageobjects/logoutPage.js');

describe('Open login page', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1366, 768);
    browser.url('https://nai-megarocket-app.vercel.app/landing');
  });

  it('Super Admin login', async () => {
    await LandingPage.goToLogin();
    await expect(browser).toHaveUrlContaining('https://nai-megarocket-app.vercel.app/auth/login');
    await LoginPage.login('superadmingmail.com', '');
    await LoginPage.clickOnBtnSubmit();
    await expect(LoginPage.errorMessageEmail).toBeDisplayed();
    await expect(LoginPage.errorMessagePassword).toBeDisplayed();
    await expect(LoginPage.eyeBtnPassword).toBeClickable();
    await LoginPage.login('admin@gmail.com', 'Hotfixteam1!');
    await LoginPage.clickOnBtnSubmit();
    await expect(browser).toHaveUrlContaining(
      'https://nai-megarocket-app.vercel.app/super-admins/admins'
    );
  });

  it('Adding an Admin', async () => {
    await expect(SuperAdminPage.tableSuperAdmin).toBeDisplayed();
    await SuperAdminPage.clickOnAddBtn();
    await SuperAdminPage.fillAdminForm(
      'Susana',
      'Gimenez',
      '40404040',
      'Firebase2!',
      'susi@gmail.com',
      '1234432112',
      'miami'
    );
    await SuperAdminPage.clickOnSubmitBtn();
    await expect(browser).toHaveUrlContaining(
      'https://nai-megarocket-app.vercel.app/super-admins/admins'
    );
  });

  it('Changing Password and phone number', async () => {
    await SuperAdminPage.clickOnEditIcon();
    await SuperAdminPage.clickOnChangePasswordBtn();
    await expect(SuperAdminPage.btnEye).toBeClickable();
    await SuperAdminPage.changePassword('Firebase2!', 'Firebase1!');
    await expect(SuperAdminPage.inputChangePassword).toEqual();
    await SuperAdminPage.clickOnConfirmBtn();
    await SuperAdminPage.changePhoneNumber('40404041');
    await SuperAdminPage.clickOnSubmitBtn();
  });

  it('Deleting an Admin', async () => {
    await SuperAdminPage.searching('Susana');
    await SuperAdminPage.clickOnDeleteIcon();
    await SuperAdminPage.clickOnDeleteIcon();
    await expect(SuperAdminPage.modalSuperAdmin).toExist();
    await SuperAdminPage.clickOnConfirmDelete();
  });

  it('Login out', async () => {
    await LogoutPage.clickOnAvatarBtn();
    await expect(LogoutPage.dropDownMenu).toBeDisplayed();
    await LogoutPage.clickOnLogoutBtn();
    await expect(LogoutPage.btnLogoutModalCancel).toExist();
    await LogoutPage.clickOnConfirmLogoutBtn();
  });
});
