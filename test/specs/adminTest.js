/* eslint-disable no-undef */
/*const LoginPage = require('../pageobjects/loginPage');
const LandingPage = require('../pageobjects/landingPage');
const NavBarPage = require('../pageobjects/navBarPage');
const AdminPage = require('../pageobjects/adminPage');

describe('Admin navigation flow', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1366, 768);
    browser.url(
      'https://nai-megarocket-app-git-feature-mr-266testid-creatio-71203f-basp.vercel.app/landing'
    );
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
    await AdminPage.btnEditProfile.waitForDisplayed();
    await AdminPage.btnEditProfile.click();
    await AdminPage.inputPhone.waitForDisplayed();
    await AdminPage.fillForm();
    await AdminPage.btnSubmitProfile.click();
  });

  it('should click on Activities button on the sidebar', async () => {
    await NavBarPage.btnActivityAdmin.waitForDisplayed();
    await NavBarPage.btnActivityAdmin.click();
  });

  it('should add a new activity', async () => {
    await AdminPage.btnAddActivity.click();
    await AdminPage.fillFormAddActivity();
    await AdminPage.btnAdd.click();
  });

  it('should filter the created activity in the search input', async () => {
    await AdminPage.btnAddActivity.click();
    await AdminPage.fillFormAddActivity();
    await AdminPage.btnAdd.click();
  });

  it('should edit an activity', async () => {
    await setTimeout(async () => {
      await AdminPage.tableAdmin.waitForDisplayed();
    }, 20000);
    await setTimeout(async () => {
      await AdminPage.iconEditActivity.waitForDisplayed();
    }, 20000);
    await AdminPage.iconEditActivity.click();
    await AdminPage.inputActivityNameModal.setValue('Zombha');
    await AdminPage.btnAdd.click();
  });

  it('should delete an activity', async () => {
    await AdminPage.iconDeleteActivity.waitForDisplayed();
    await AdminPage.iconDeleteActivity.click();
    await AdminPage.btnConfirmModal.click();
  });
});
*/
