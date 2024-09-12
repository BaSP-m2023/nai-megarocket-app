/* eslint-disable no-undef */
const LoginPage = require('../pageobjects/loginPage');
const LandingPage = require('../pageobjects/landingPage');
const NavBarPage = require('../pageobjects/navBarPage');
const AdminPage = require('../pageobjects/adminPage');
const LogoutPage = require('../pageobjects/logoutPage');

describe('Admin navigation flow', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1920, 1080);
    browser.url('https://nai-megarocket-app.vercel.app/landing');
  });

  it('should open the Login Page, fill the inputs and login succesfully', async () => {
    await LandingPage.btnLogin.click();
    await expect(browser).toHaveUrlContaining('https://nai-megarocket-app.vercel.app/auth/login');
    await LoginPage.login('superadmingmail.com', '');
    await expect(LoginPage.errorMessageEmail).toBeDisplayed();
    await expect(LoginPage.errorMessagePassword).toBeDisplayed();
    await LoginPage.login('admin@gmail.com', 'Firebase1!');
  });

  it('should click on Profile button on the sidebar, display the profile form and edit the admins phone number', async () => {
    await NavBarPage.btnProfileAdmin.waitForDisplayed();
    await NavBarPage.btnProfileAdmin.click();
    await AdminPage.btnEditProfile.waitForDisplayed();
    await AdminPage.btnEditProfile.click();
    await AdminPage.inputPhone.waitForDisplayed();
    await AdminPage.fillForm();
    await AdminPage.btnSubmit.click();
  });

  it('should click on Activities button on the sidebar', async () => {
    await NavBarPage.btnActivityAdmin.waitForDisplayed();
    await NavBarPage.btnActivityAdmin.click();
    await browser.pause(1000);
  });

  it('should add a new activity', async () => {
    await AdminPage.btnAddActivity.click();
    await AdminPage.fillFormAddActivity();
    await AdminPage.btnAdminSubmit.click();
  });

  it('should filter by the recent added activity', async () => {
    await AdminPage.inputSearchTable.click();
    await AdminPage.inputSearchTable.setValue('Jump');
    await browser.pause(1000);
  });

  it('should edit an activity', async () => {
    await AdminPage.tableAdmin.waitForDisplayed();
    expect(AdminPage.iconEditActivity).toBeDisplayed();
    await AdminPage.iconEditActivity.click();
    await AdminPage.inputActivityNameModal.setValue('Zumba');
    await AdminPage.inputActivityDescriptionModalUpdate.setValue('Dance to success');
    await AdminPage.btnAdminSubmit.click();
    await browser.pause(1000);
  });

  it('should delete an activity', async () => {
    await AdminPage.inputSearchTable.click();
    await AdminPage.inputSearchTable.setValue('Zumba');
    await browser.pause(1000);
    await AdminPage.iconDeleteActivity.waitForDisplayed();
    await AdminPage.iconDeleteActivity.click();
    await browser.pause(1000);
    await AdminPage.btnConfirmModal.click();
    await browser.pause(1000);
  });
  /*
  it('should click on Classes button on the sidebar', async () => {
    await NavBarPage.btnClassAdmin.waitForDisplayed();
    await NavBarPage.btnClassAdmin.click();
    await browser.pause(1000);
  });

  it('should add a new class', async () => {
    await AdminPage.btnAddClass.click();
    await AdminPage.fillFormAddClass();
    await AdminPage.btnAdminSubmit.click();
    await browser.pause(1000);
  });

  it('should filter the class by activity and trainer', async () => {
    await AdminPage.selectClassActivity.click();
    await AdminPage.selectClassActivityBoxing.click();
    await AdminPage.selectClassTrainer.click();
    await AdminPage.selectClassTrainerLuciano.click();
    await browser.pause(1000);
  });

  it('should choose and edit the new class ', async () => {
    expect(AdminPage.btnSelectSchedule).toBeDisplayed();
    await AdminPage.btnSelectSchedule.click();
    await AdminPage.btnAdminEditClass.click();
    await AdminPage.inputDay.click();
    await AdminPage.inputDayWednesday.click();
    await AdminPage.inputDayFriday.click();
    await AdminPage.containerFormClasses.click();
    await AdminPage.inputSlots.setValue('5');
    await AdminPage.btnAdminSubmit.click();
  });

  it('should delete the class ', async () => {
    await AdminPage.btnSelectSchedule.waitForDisplayed();
    await AdminPage.btnSelectSchedule.click();
    await AdminPage.btnAdminDeleteClass.click();
    await AdminPage.btnConfirmModal.click();
    await browser.pause(1000);
  });
  */ /*
  it('should click on Member button on the sidebar', async () => {
    await NavBarPage.btnMember.waitForDisplayed();
    await NavBarPage.btnMember.click();
    await browser.pause(1000);
  });

  it('should add a new member', async () => {
    await AdminPage.btnAddMember.click();
    await AdminPage.fillFormAddMember();
    await AdminPage.btnAdminSubmit.click();
  });

  it('should filter the member by name', async () => {
    await AdminPage.inputSearchTable.click();
    await AdminPage.inputSearchTable.setValue('Pedro Pascal');
    await browser.pause(1000);
  });

  it('should edit a Member', async () => {
    expect(AdminPage.tableAdmin).toBeDisplayed();
    await AdminPage.iconEditMember.waitForDisplayed();
    await AdminPage.iconEditMember.click();
    await AdminPage.inputPhone.setValue('3412588522');
    await AdminPage.inputEmail.setValue('pedritoP@megarocket.com');
    await AdminPage.btnAdminSubmit.click();
    await browser.pause(1000);
  });

  it('should delete a Member', async () => {
    await AdminPage.inputSearchTable.click();
    await AdminPage.inputSearchTable.setValue('Pedro Pascal');
    await browser.pause(1000);
    await AdminPage.iconDeleteMember.waitForDisplayed();
    await AdminPage.iconDeleteMember.click();
    await browser.pause(1000);
    await AdminPage.btnConfirmModalMember.click();
  });
*/
  it('should click on Trainer button on the sidebar', async () => {
    await NavBarPage.btnTrainer.waitForDisplayed();
    await NavBarPage.btnTrainer.click();
  });

  it('Create a new trainer', async () => {
    await AdminPage.btnAddTrainer.click();
    await AdminPage.fillFormAddTrainer();
    await AdminPage.btnAdminSubmit.click();
  });

  it('Update a trainer', async () => {
    await AdminPage.inputSearchTable.click();
    await AdminPage.inputSearchTable.setValue('Maria Becerra');
    await browser.pause(1000);
    await AdminPage.inputPhone.setValue('3416546546');
    await AdminPage.inputEmail.setValue('mariaB@gmail.com');
    await AdminPage.inputSalary.setValue('100');
  });

  it('Delete a trainer', async () => {
    await AdminPage.inputSearchTable.click();
    await AdminPage.inputSearchTable.setValue('Maria Becerra');
    await browser.pause(1000);
    await AdminPage.iconDeleteTrainer.click();
    await AdminPage.btnConfirmModalTrainer.click();
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
    await AdminPage.btnAdminSubmit.click();
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
