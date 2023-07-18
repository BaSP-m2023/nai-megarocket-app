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

  async clickLogin() {
    await this.btnLogin.click();
  }

  async clickSignUp() {
    await this.btnSignup.click();
  }
}

module.exports = new LandingPage();
