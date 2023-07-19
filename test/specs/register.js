/* eslint-disable no-undef */
/*const LandingPage = require('../pageobjects/landingPage');
const LoginPage = require('../pageobjects/loginPage');
const NavBarPage = require('../pageobjects/navBarPage');
const LogoutPage = require('../pageobjects/logoutPage');
const AdminPage = require('../pageobjects/adminPage');

describe('Register', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1366, 768);
    browser.url('https://nai-megarocket-app.vercel.app/landing');
  });

  it('should open the landing page and click on Sign Up button', async () => {
    await expect(LandingPage.btnSignup).toExist();
    await LandingPage.goToSignUp();
  });

  it('should register a new member succesfully', async () => {
    await RegisterPage.fillFormRegister(
      'Maria',
      'Becerra',
      '37456987',
      '3412589844',
      'maria_b@gmail.com',
      'Pass1234!',
      'Rosario',
      '12-10-2000',
      '2000'
    );
    await RegisterPage.signUp();
  });

  it('Should logout', async () => {
    await expect(LogoutPage.btnHeaderAvatar).toBeDisplayed();
    await LogoutPage.btnHeaderAvatar.click();
    await expect(LogoutPage.btnLogout).toBeDisplayed();
    await LogoutPage.btnLogout.click();
    await expect(LogoutPage.btnLogoutModalConfirm).toBeDisplayed();
    await LogoutPage.btnLogoutModalConfirm.click();
  });

  it('Admin login in order to autorize a new member', async () => {
    await LoginPage.login('admin@gmail.com', 'Firebase1!');
    await LogoutPage.btnHeaderAvatar.click();
    await LogoutPage.btnLogout.waitForDisplayed();
    await LogoutPage.btnLogout.click();
    await LogoutPage.btnLogoutModalConfirm.waitForDisplayed();
    await LogoutPage.btnLogoutModalConfirm.click();
    await NavBarPage.btnProfileMember.click();
    await expect(AdminPage.inputSearchTable).toExist();
    await AdminPage.inputSearchTable.setValue('Maria');
    await AdminPage.iconEditMember.click();
    await AdminPage.btnActive.click();
    await AdminPage.btnAdminSubmit.click();

    await LogoutPage.btnHeaderAvatar.click();
    await LogoutPage.btnLogout.click();
    await LogoutPage.btnLogoutModalConfirm.click();
  });
});
*/
