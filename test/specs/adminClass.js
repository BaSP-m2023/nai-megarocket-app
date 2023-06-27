/* eslint-disable no-undef */
const LoginPage = require('../pageobjects/loginPage');
const AdminNavBarPage = require('../pageobjects/adminNavBarPage');

describe('LoginPage', () => {
  it('should login with correct email and password', async () => {
    await LoginPage.open('https://nai-megarocket-app.vercel.app');
    await LoginPage.linkLogin.waitForDisplayed();
    await LoginPage.linkLogin.waitForEnabled();
    await LoginPage.singIn();
    await LoginPage.inputEmail.waitForDisplayed();
    await LoginPage.inputEmail.waitForEnabled();
    await LoginPage.inputPassword.waitForDisplayed();
    await LoginPage.inputPassword.waitForEnabled();
    await LoginPage.login('admin@gmail.com', 'Firebase1!');
  });

  it('should click on Activities option', async () => {
    await AdminNavBarPage.open('https://nai-megarocket-app.vercel.app/admins');
    await AdminNavBarPage.classOptionButton.waitForDisplayed();
    await AdminNavBarPage.classOptionButton.waitForEnabled();
    await AdminNavBarPage.classOptionButton.click();
  });
});
