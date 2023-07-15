/* eslint-disable no-undef */
const LandingPage = require('../pageobjects/landinPage.js');

describe('Open landing page', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1366, 768);
    browser.url('https://nai-megarocket-fgy8ug7i7-basp.vercel.app/admins/home');
  });

  it('Landing', async () => {
    await expect(LandingPage.btnLogo).toBeDisplayed();
    await LandingPage.goToLogin();
    await browser.switchWindow('https://nai-megarocket-app.vercel.app/auth/login');
    await expect(browser).toHaveUrlContaining('https://nai-megarocket-app.vercel.app/auth/login');
    await browser.switchWindow('https://nai-megarocket-fgy8ug7i7-basp.vercel.app/admins/home');

    await LandingPage.goToSignUp();
    await browser.switchWindow('https://nai-megarocket-app.vercel.app/auth/register');
    await expect(browser).toHaveUrlContaining(
      'https://nai-megarocket-app.vercel.app/auth/register'
    );
    await browser.switchWindow('https://nai-megarocket-fgy8ug7i7-basp.vercel.app/admins/home');

    await LandingPage.clickOnJoinOurGymBtn();
    await browser.switchWindow('https://nai-megarocket-app.vercel.app/auth/register');
    await expect(browser).toHaveUrlContaining(
      'https://nai-megarocket-app.vercel.app/auth/register'
    );
    await browser.switchWindow('https://nai-megarocket-fgy8ug7i7-basp.vercel.app/admins/home');

    await LandingPage.clickOnJoinNowBtn();
    await browser.switchWindow('https://nai-megarocket-app.vercel.app/auth/register');
    await expect(browser).toHaveUrlContaining(
      'https://nai-megarocket-app.vercel.app/auth/register'
    );
    await browser.switchWindow('https://nai-megarocket-fgy8ug7i7-basp.vercel.app/admins/home');

    await LandingPage.scrollDownToFooter();
    await expect(LandingPage.linkFacebook).toBeClickeable();
    await expect(LandingPage.linkTwitter).toBeClickeable();
    await expect(LandingPage.linkInstagram).toBeClickeable();
    await expect(LandingPage.linkGoogleMaps).toBeClickeable();
    await expect(LandingPage.linkWhatsapp).toBeClickeable();
    await expect(LandingPage.linkEmail).toBeClickeable();
  });
});
