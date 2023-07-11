/* eslint-disable no-undef */
import LoginPage from '../pageobjects/loginPage';
import AdminNavBarPage from '../pageobjects/adminNavBarPage';

describe('LoginPage', () => {
  it('should login with correct email and password', async () => {
    await LoginPage.open('https://nai-megarocket-app.vercel.app/');
    await LoginPage.linkLogin.waitForDisplayed();
    await LoginPage.singIn();
    await LoginPage.inputEmail.waitForDisplayed();
    await LoginPage.inputPassword.waitForDisplayed();
    await LoginPage.login('admin1@gmail.com', 'Firebase1!');
  });

  it('should click on Admin button on the sidebar and display the options', async () => {
    await AdminNavBarPage.open('https://nai-megarocket-app.vercel.app/admins');
    await AdminNavBarPage.adminButton.waitForDisplayed();
    await AdminNavBarPage.adminButton.click();
  });

  it('should click on activities option', async () => {
    await AdminNavBarPage.open('https://nai-megarocket-app.vercel.app/admins');
    await AdminNavBarPage.classButton.waitForDisplayed();
    await AdminNavBarPage.classButton.click();
  });
});
