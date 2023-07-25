/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const LandingPage = require('../pageobjects/landingPage.js');

describe('Landing page', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1366, 768);
    browser.url('https://nai-megarocket-app.vercel.app/landing');
  });

  it("Trying Register's access buttons", async () => {
    await expect(LandingPage.btnLogo).toBeDisplayed();
    await LandingPage.btnLogin.click();
    await expect(browser).toHaveUrlContaining('https://nai-megarocket-app.vercel.app/auth/login');
    await browser.url('https://nai-megarocket-app.vercel.app/landing');
    await LandingPage.goToSignUp();
    await expect(browser).toHaveUrlContaining(
      'https://nai-megarocket-app.vercel.app/auth/register'
    );
    await browser.url('https://nai-megarocket-app.vercel.app/landing');
  });

  it('Trying Landing links', async () => {
    await expect(LandingPage.btnLogo).toBeDisplayed();
    await expect(LandingPage.linkFacebook).toHaveHrefContaining('https://www.facebook.com/radiumrocket');
    await expect(LandingPage.linkTwitter).toHaveLinkContaining('https://twitter.com/radiumrocket');
    await expect(LandingPage.linkInstagram).toHaveHrefContaining('https://www.instagram.com/radium.rocket/');
    await expect(LandingPage.linkGoogleMaps).toHaveHrefContaining('https://www.google.com/maps/place/C%C3%B3rdoba+2535,+S2000KZG+Rosario,+Santa+Fe/@-32.9429766,-60.6601152,17z/data=!4m5!3m4!1s0x95b7ab440630e631:0x1c43ee24c6347f71!8m2!3d-32.9431072!4d-60.6579802?entry=ttu');
    await expect(LandingPage.linkWhatsapp).toHaveTextContaining('341 - 0303456');
    await expect(LandingPage.linkEmail).toHaveTextContaining('contact@megarocket.com');
  });
});