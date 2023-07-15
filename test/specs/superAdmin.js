/* eslint-disable no-undef */
const LoginPage = require('../pageobjects/loginPage.js');

describe('Open login page', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1366, 768);
    browser.url('https://nai-megarocket-fgy8ug7i7-basp.vercel.app/admins/home');
  });

  it('Super Admin login', async () => {
    await expect(LoginPage.titleLogin).toBeDisplayed();
    await LoginPage.login('superadmingmail.com', '');
    await LoginPage.clickOnBtnSubmit();
    await expect(LoginPage.errorMessageEmail).toBeDisplayed();
    await expect(LoginPage.errorMessagePassword).toBeDisplayed();
    await expect(LoginPage.eyeBtnPassword).toBeClickable();
    await LoginPage.login('admin@gmail.com', 'Hotfixteam1!');
    await LoginPage.clickOnBtnSubmit();
    await expect(browser).toHaveUrlContaining(
      'https://nai-megarocket-app.vercel.app/super-admins/admins'
    );
  });
});
