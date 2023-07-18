/* eslint-disable no-undef */
class LandingPage {
  get btnLogo() {
    return $('#logo-button-header');
  }

  get btnLogin() {
    return $('#login-button-header');
  }

  get btnSignup() {
    return $('#sign-up-button-header');
  }

  get btnJoinOurGym() {
    return $('#login-button-register-1');
  }

  get btnJoinNow() {
    return $('#login-button-register-2');
  }

  get linkFacebook() {
    return $('#facebook-bar-link');
  }

  get linkTwitter() {
    return $('#twitter-bar-link');
  }

  get linkInstagram() {
    return $('#instagram-bar-link');
  }

  get linkGoogleMaps() {
    return $('#google-maps-bar-link');
  }

  get linkWhatsapp() {
    return $('#phone-number-bar-link');
  }

  get linkEmail() {
    return $('#mail-bar-link');
  }

  async goToLogin() {
    await this.btnLogin.click();
  }

  async goToSignUp() {
    await this.btnSignup.click();
  }

  async clickOnJoinOurGymBtn() {
    await this.btnJoinOurGym.click();
  }

  async clickOnJoinNowBtn() {
    await this.btnJoinNow.click();
  }

  async scrollALittle() {
    await browser.execute(() => {
      const button = document.querySelector('#login-button-register-1');
      if (button) {
        button.scrollIntoView();
      }
    });
  }
  async scrollDownToFooter() {
    await browser.execute(() => {
      const footer = document.querySelector('.footer');
      if (footer) {
        footer.scrollIntoView();
      }
    });
  }
}
module.exports = new LandingPage();
