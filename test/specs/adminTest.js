/* eslint-disable no-undef */
const LoginPage = require('../pageobjects/loginPage');
const LandingPage = require('../pageobjects/landingPage');
const NavBarPage = require('../pageobjects/navBarPage');
const AdminPage = require('../pageobjects/adminPage');

describe('Admin navigation flow', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1366, 768);
    browser.url('https://nai-megarocket-app.vercel.app/landing');
  });

  it('should open the landing page and click on login button', async () => {
    await LandingPage.btnLogin.waitForDisplayed();
    await LandingPage.clickLogin();
  });

  it('should open the Login Page, fill the inputs and login succesfully', async () => {
    await LoginPage.titleLogin.waitForDisplayed();
    await LoginPage.inputEmail.waitForDisplayed();
    await LoginPage.inputPassword.waitForDisplayed();
    await LoginPage.login('admin@gmail.com', 'Firebase1!');
  });
  it('should click on Profile button on the sidebar, display the profile form and edit the admins phone number', async () => {
    await NavBarPage.btnProfileAdmin.waitForDisplayed();
    await NavBarPage.btnProfileAdmin.click();
    await AdminPage.btnEdit.waitForDisplayed();
    await AdminPage.btnEdit.click();
    await AdminPage.inputPhone.waitForDisplayed();
    await AdminPage.fillForm();
    await AdminPage.btnSubmitProfile.click();
  });

  it('should click on Activities button on the sidebar', async () => {
    await NavBarPage.activityButton.waitForDisplayed();
    await NavBarPage.activityButton.click();
  });
});
