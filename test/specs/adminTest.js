/* eslint-disable no-undef */
const LoginPage = require('../pageobjects/loginPage');
const LandingPage = require('../pageobjects/landingPage');
const NavBarPage = require('../pageobjects/navBarPage');
const AdminPage = require('../pageobjects/adminPage');
const LogoutPage = require('../pageobjects/logoutPage');

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
    await AdminPage.btnEditProfile.waitForDisplayed();
    await AdminPage.btnEditProfile.click();
    await AdminPage.inputPhone.waitForDisplayed();
    await AdminPage.fillForm();
    await AdminPage.btnSubmitProfile.click();
    await browser.pause(1000);
  });

  it('should click on Activities button on the sidebar', async () => {
    await NavBarPage.btnActivityAdmin.waitForDisplayed();
    await NavBarPage.btnActivityAdmin.click();
  });

  it('should add a new activity', async () => {
    await AdminPage.inputSearchTable.click();
    await AdminPage.inputSearchTable.setValue('aaa');
    await browser.pause(3000);
    await AdminPage.btnAddActivity.click();
    await AdminPage.fillFormAddActivity();
    await AdminPage.btnAdd.click();
  });

  it('should edit an activity', async () => {
    await setTimeout(async () => {
      await AdminPage.tableAdmin.waitForDisplayed();
    }, 15000);
    await setTimeout(async () => {
      await AdminPage.iconEditActivity.waitForDisplayed();
    }, 15000);
    await AdminPage.iconEditActivity.click();
    await AdminPage.inputActivityNameModal.setValue('Zumba');
    await AdminPage.btnAdd.click();
  });

  it('should delete an activity', async () => {
    await AdminPage.iconDeleteActivity.waitForDisplayed();
    await AdminPage.iconDeleteActivity.click();
    await browser.pause(1000);
    await AdminPage.btnConfirmModal.click();
    await browser.pause(1000);
  });

  it('should click on Classes button on the sidebar', async () => {
    await NavBarPage.btnClassAdmin.waitForDisplayed();
    await NavBarPage.btnClassAdmin.click();
  });

  it('should add a new class', async () => {
    await AdminPage.btnAddClass.click();
    await AdminPage.fillFormAddClass();
    await AdminPage.btnAdd.click();
    await browser.pause(1000);
  });

  it('should filter the class by activity and trainer', async () => {
    await AdminPage.btnAddClass.click();
    await AdminPage.fillFormAddClass();
    await AdminPage.btnAdd.click();
    await browser.pause(1000);
  });

  it('should click on Member button on the sidebar', async () => {
    await NavBarPage.btnMember.waitForDisplayed();
    await NavBarPage.btnMember.click();
  });

  it('should add a new member', async () => {
    await AdminPage.btnAddMember.click();
    await AdminPage.fillFormAddMember();
    await AdminPage.btnAdd.click();
  });

  it('should edit a Member', async () => {
    await setTimeout(async () => {
      await AdminPage.tableAdmin.waitForDisplayed();
    }, 15000);
    await setTimeout(async () => {
      await AdminPage.iconEditMember.waitForDisplayed();
    }, 15000);
    await AdminPage.iconEditMember.click();
    await AdminPage.inputPhone.setValue('3412588522');
    await AdminPage.inputEmail.setValue('new@gmail.com');
    await AdminPage.btnAdd.click();
    await browser.pause(1000);
  });

  it('should delete a Member', async () => {
    await AdminPage.iconDeleteMember.waitForDisplayed();
    await AdminPage.iconDeleteMember.click();
    await browser.pause(1000);
    await AdminPage.btnConfirmModalMember.click();
    await browser.pause(1000);
  });

  it('should click on Subscription button on the sidebar', async () => {
    await NavBarPage.btnSubscriptions.waitForDisplayed();
    await NavBarPage.btnSubscriptions.click();
  });

  it('should add a new Subscription', async () => {
    await NavBarPage.btnSubscriptions.waitForDisplayed();
    await NavBarPage.btnSubscriptions.click();
  });

  it('should click and switch to the final page', async () => {
    await AdminPage.btnNext2.click();
    await AdminPage.btnNext2.click();
    await browser.pause(1000);
  });

  it('should edit a Subscription', async () => {
    await setTimeout(async () => {
      await AdminPage.tableAdmin.waitForDisplayed();
    }, 15000);
    await setTimeout(async () => {
      await AdminPage.iconEditSubscription.waitForDisplayed();
    }, 15000);
    await AdminPage.iconEditSubscription.click();

    await AdminPage.inputClasses.click();
    await AdminPage.inputClasses01.click();
    await AdminPage.btnAdd.click();
    await browser.pause(1000);
  });

  it('should click on Reports button on the sidebar', async () => {
    await NavBarPage.btnReports.waitForDisplayed();
    await NavBarPage.btnReports.click();
  });

  it('should click on reports buttons and show all', async () => {
    await AdminPage.btnReportsSubscriptions.waitForDisplayed();
    await AdminPage.btnReportsSubscriptions.click();
    await browser.pause(1000);
    await AdminPage.btnReportsMembers.waitForDisplayed();
    await AdminPage.btnReportsMembers.click();
    await browser.pause(1000);
    await AdminPage.btnReportsActivities.waitForDisplayed();
    await AdminPage.btnReportsActivities.click();
  });

  it('should click on Home button on the sidebar', async () => {
    await NavBarPage.btnHomeadmin.waitForDisplayed();
    await NavBarPage.btnHomeadmin.click();
    await browser.pause(1000);
  });

  it('should logout succesfully', async () => {
    await LogoutPage.btnHeaderAvatar.waitForDisplayed();
    await LogoutPage.btnHeaderAvatar.click();
    await browser.pause(1000);
    await LogoutPage.btnHeaderAvatar.waitForDisplayed();
    await LogoutPage.btnLogout.click();
    await browser.pause(1000);
    await LogoutPage.btnHeaderAvatar.waitForDisplayed();
    await LogoutPage.btnLogoutModalConfirm.click();
  });
});
