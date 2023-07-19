/* eslint-disable no-undef */
/*const LoginPage = require('../pageobjects/loginPage');
const NavBarPage = require('../pageobjects/navBarPage');
const TrainerPage = require('../pageobjects/trainerPage');
const LogoutPage = require('../pageobjects/logoutPage');
const LandingPage = require('../pageobjects/landingPage.js');

describe('Trainers flow', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1366, 768);
    browser.url('https://nai-megarocket-app.vercel.app/landing');
  });

  it('Login', async () => {
    await LandingPage.goToLogin();
    await expect(browser).toHaveUrlContaining('https://nai-megarocket-app.vercel.app/auth/login');
    await expect(LoginPage.eyeBtnPassword).toBeClickable();
    await expect(LoginPage.linkCreateAnAccount).toExist();
    await expect(LoginPage.linkForgotPassword).toExist();
    await LoginPage.login('trainergmail.com', '');
    await LoginPage.clickOnBtnSubmit();
    await expect(LoginPage.errorMessageEmail).toBeDisplayed();
    await expect(LoginPage.errorMessagePassword).toBeDisplayed();
    await LoginPage.login('trainer1@gmail.com', 'Firebase1!');
    await LoginPage.clickOnBtnSubmit();
  });

  it('Updating data from profile', async () => {
    await expectNavBarPage.btnProfileTrainer.click();
    await TrainerPage.clickOnEditBtn();
    await TrainerPage.inputPhone.setValue('1111111980');
    await TrainerPage.clickOnConfirmBtn();
    await expect(NavBarPage.btnHomeTrainer).toBeClickable();
  });

  it('Visualizing classes', async () => {
    await NavBarPage.btnClassTrainer.click();
    await expect(TrainerPage.inputActivitySelector).toBeClickable();
    await TrainerPage.classCard.click();
    await expect(TrainerPage.modalClassTitle).toBeDisplayed();
    await expect(TrainerPage.modalClassSlots).toBeDisplayed();
    await TrainerPage.modalClose.click();
  
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
