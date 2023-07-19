/* eslint-disable no-undef */
/*const LandingPage = require('../pageobjects/landingPage');
const LoginPage = require('../pageobjects/loginPage');
const NavBarPage = require('../pageobjects/navBarPage');
const MemberPage = require('../pageobjects/memberPage');
const LogoutPage = require('../pageobjects/logoutPage');

describe('Member flow', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1366, 768);
    browser.url('https://nai-megarocket-app.vercel.app/landing');
  });

  it('should open the Login Page, fill the inputs and login succesfully', async () => {
    await LandingPage.btnLogin.waitForDisplayed();
    await LandingPage.goToLogin();
    await LoginPage.titleLogin.waitForDisplayed();
    await LoginPage.inputEmail.waitForDisplayed();
    await LoginPage.inputPassword.waitForDisplayed();
    await LoginPage.login('member1@gmail.com', 'Firebase1!');
  });

  it('should click on Profile button on the sidebar, display the profile form and edit the members phone number', async () => {
    await NavBarPage.btnProfileMember.waitForDisplayed();
    await NavBarPage.btnProfileMember.click();
    await MemberPage.btnEdit.waitForClickable();
    await MemberPage.btnEdit.click();
    await MemberPage.inputPhone.waitForDisplayed();
    await MemberPage.fillForm();
    await MemberPage.btnConfirm.click();
  });

  it('should click on Schedule button on the sidebar, display the calendar, click on the select and switch to Box to display box classes', async () => {
    await NavBarPage.btnSchedule.waitForDisplayed();
    await NavBarPage.btnSchedule.click();
    await MemberPage.inputSelectActivity.waitForClickable();
    await MemberPage.inputSelectActivity.click();
    await MemberPage.inputSelectActivityOptionBox.waitForDisplayed();
    await MemberPage.inputSelectActivityOptionBox.click();
  });

  it('should click on Activities button on the sidebar, display the activities and scroll down the page', async () => {
    await NavBarPage.btnActivityMember.waitForDisplayed();
    await NavBarPage.btnActivityMember.click();
    await browser.execute((scrollDistance) => {
      window.scrollTo(0, scrollDistance);
    }, 1600);
  });

  it('should click on Memberships button on the sidebar and display the memberships', async () => {
    await NavBarPage.btnMembership.waitForDisplayed();
    await NavBarPage.btnMembership.click();
  });

  it('should click on Header avatar button, display the options and click on logout', async () => {
    await LogoutPage.btnHeaderAvatar.waitForDisplayed();
    await LogoutPage.btnHeaderAvatar.click();
    await LogoutPage.btnLogout.waitForDisplayed();
    await LogoutPage.btnLogout.click();
    await LogoutPage.btnLogoutModalConfirm.waitForDisplayed();
    await LogoutPage.btnLogoutModalConfirm.click();
  });
});
*/
