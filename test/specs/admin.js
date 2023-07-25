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
    await LoginPage.clickOnBtnSubmit();
    await expect(LoginPage.errorMessageEmail).toBeDisplayed();
    await expect(LoginPage.errorMessagePassword).toBeDisplayed();
    await LoginPage.login('admin@gmail.com', 'Firebase1!');
    await LoginPage.clickOnBtnSubmit();
  });
  it('should click on Profile button on the sidebar, display the profile form and edit the admins phone number', async () => {
    await expect(NavBarPage.btnProfileAdmin).toBeDisplayed();
    await NavBarPage.btnProfileAdmin.click();
    await expect(AdminPage.btnEditProfile).toBeDisplayed();
    await AdminPage.btnEditProfile.click();
    await expect(AdminPage.inputPhone).toBeDisplayed();
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
  it('should click on Classes button on the sidebar', async () => {
    await NavBarPage.btnClassAdmin.waitForDisplayed();
    await NavBarPage.btnClassAdmin.click();
    await browser.pause(1000);
  });
  it('should filter the class by activity and trainer', async () => {
    await AdminPage.selectClassActivity.click();
    await AdminPage.selectClassActivityPilates.click();
    await AdminPage.selectClassTrainer.click();
    await AdminPage.selectClassTrainerNaza.click();
    await browser.pause(1000);
  });
  it('should choose and edit the new class ', async () => {
    await expect(AdminPage.btnSelectSchedule).toBeDisplayed();
    await AdminPage.btnSelectSchedule.click();
    await AdminPage.btnAdminEditClass.click();
    await AdminPage.inputHour.click();
    await AdminPage.inputHour13.click();
    await expect(AdminPage.inputSlots).toExist();
    await AdminPage.inputSlots.setValue('5');
    await AdminPage.btnAdminSubmit.click();
    await browser.pause(1000);
  });
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
    await AdminPage.iconEditTrainer.click();
    await AdminPage.inputPhone.setValue('3416546546');
    await AdminPage.inputEmail.setValue('mariaB@gmail.com');
    await AdminPage.inputSalary.setValue('100');
    await AdminPage.btnAdminSubmit.click();
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
    await browser.pause(1000);
  });
  it('should add a new Subscription', async () => {
    await AdminPage.btnAddSubscription.click();
    await expect(AdminPage.inputClasses).toBeDisplayed();
    await AdminPage.inputClasses.click();
    await AdminPage.inputClassPilates11.click();
    await expect(AdminPage.inputMember).toBeDisplayed();
    await AdminPage.inputMember.click();
    await AdminPage.inputMemberAlberto.click();
    await AdminPage.btnAdminSubmit.click();
    await browser.pause(1000);
  });
  it('should edit a Subscription', async () => {
    await AdminPage.tableAdmin.waitForDisplayed();
    await AdminPage.iconEditSubscription.waitForDisplayed();
    await AdminPage.iconEditSubscription.click();
    await AdminPage.inputClasses.click();
    await AdminPage.inputClassBoxing17.click();
    await AdminPage.btnAdminSubmit.click();
    await browser.pause(1000);
  });
  it('should click to delete a Subscription and cancel it', async () => {
    await AdminPage.tableAdmin.waitForDisplayed();
    await AdminPage.iconDeleteSubscription.waitForDisplayed();
    await AdminPage.iconDeleteSubscription.click();
    await AdminPage.btnCancelModalSubscription.click();
    await browser.pause(1000);
  });
  it('should click on Reports button on the sidebar', async () => {
    await expect(NavBarPage.btnReports).toBeDisplayed();
    await NavBarPage.btnReports.click();
    await browser.pause(1000);
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
  it('should scroll on Home side images', async () => {
    await AdminPage.scrollImages.waitForDisplayed();
    await AdminPage.scrollImages.scrollIntoView();
    await expect(AdminPage.packOfImages).toHaveChildren();
    await browser.pause(1000);
  });
  it('should logout succesfully', async () => {
    await LogoutPage.btnHeaderAvatar.waitForDisplayed();
    await LogoutPage.clickOnAvatarBtn();
    await browser.pause(1000);
    await expect(LogoutPage.dropDownMenu).toBeDisplayed();
    await LogoutPage.clickOnLogoutBtn();
    await browser.pause(1000);
    await expect(LogoutPage.alertDialog).toHaveTextContaining('You want to leave?');
    await LogoutPage.clickOnConfirmLogoutBtn();
  });
});
