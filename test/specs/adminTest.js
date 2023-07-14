/* eslint-disable no-undef */
const LoginPage = required('../pageobjects/loginPage');
const AdminNavBarPage = required('../pageobjects/adminNavBarPage');

describe('LoginPage', () => {
  it('should login with correct email and password', async () => {
    beforeAll('Open browser', () => {
      browser.setWindowSize(1366, 768);
      browser.url(
        'https://nai-megarocket-app-git-feature-mr-258testid-creatio-6ecc7f-basp.vercel.app/auth/login'
      );
    });
    await LoginPage.linkLogin.waitForDisplayed();
    await LoginPage.singIn();
    await LoginPage.inputEmail.waitForDisplayed();
    await LoginPage.inputPassword.waitForDisplayed();
    await LoginPage.login('admin@gmail.com', 'Firebase1!');
  });

  it('should click on Admin button on the sidebar and display the options', async () => {
    await AdminNavBarPage.open('https://nai-megarocket-app.vercel.app/admins/home');
    await AdminNavBarPage.adminButton.waitForDisplayed();
    await AdminNavBarPage.adminButton.click();
  });

  it('should click on activities option', async () => {
    await AdminNavBarPage.open('https://nai-megarocket-app.vercel.app/admins/home');
    await AdminNavBarPage.activityButton.waitForDisplayed();
    await AdminNavBarPage.activityButton.click();
  });
});
