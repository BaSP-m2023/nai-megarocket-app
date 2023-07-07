const MembersPage = require('../pageobjects/membersPage');
const LoginPage = require('../pageobjects/loginPage');

describe('Process of loggin', () => {
  it('should login with valid credentials', async () => {
    beforeAll('Open browser', () => {
      browser.url('https://nai-megarocket-app.vercel.app/');
    });

    await LoginPage.adminBtnClick();
    await LoginPage.login('admin@gmail.com', 'FireBase1!');
    await LoginPage.loginModalBtnClick();
  });
});
