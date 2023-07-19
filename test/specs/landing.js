/* eslint-disable no-undef */
/*const LandingPage = require('../pageobjects/landingPage.js');

describe('Open landing page', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1366, 768);
    browser.url('https://nai-megarocket-fgy8ug7i7-basp.vercel.app/admins/home');
  });

  it("Trying Register's access buttons", async () => {
    await expect(LandingPage.btnLogo).toBeDisplayed();
    await LandingPage.goToLogin();
    await expect(browser).toHaveUrlContaining('https://nai-megarocket-app.vercel.app/auth/login');
    await browser.switchWindow('https://nai-megarocket-fgy8ug7i7-basp.vercel.app/admins/home');

    await LandingPage.goToSignUp();
    await expect(browser).toHaveUrlContaining(
      'https://nai-megarocket-app.vercel.app/auth/register'
    );
    await browser.switchWindow('https://nai-megarocket-fgy8ug7i7-basp.vercel.app/admins/home');

    await LandingPage.scrollALittle();
    await LandingPage.clickOnJoinOurGymBtn();
    await expect(browser).toHaveUrlContaining(
      'https://nai-megarocket-app.vercel.app/auth/register'
    );
    await browser.switchWindow('https://nai-megarocket-fgy8ug7i7-basp.vercel.app/admins/home');

    await LandingPage.scrollDownToFooter();
    await LandingPage.clickOnJoinNowBtn();
    await expect(browser).toHaveUrlContaining(
      'https://nai-megarocket-app.vercel.app/auth/register'
    );
    await browser.switchWindow('https://nai-megarocket-fgy8ug7i7-basp.vercel.app/admins/home');
  });

  it('Trying Landing links', async () => {
    await expect(LandingPage.btnLogo).toBeClickeable();
    await expect(LandingPage.linkFacebook).toBeClickeable();
    await expect(LandingPage.linkTwitter).toBeClickeable();
    await expect(LandingPage.linkInstagram).toBeClickeable();
    await expect(LandingPage.linkGoogleMaps).toBeClickeable();
    await expect(LandingPage.linkWhatsapp).toBeClickeable();
    await expect(LandingPage.linkEmail).toBeClickeable();
  });
});
*/
