/* eslint-disable no-undef */
class LoginPage {
  open(url) {
    return browser.url(url);
  }

  get linkLogin() {
    return $('#login-bar-link');
  }

  get inputEmail() {
    return $('#login-input-email');
  }

  get inputPassword() {
    return $('#login-input-password');
  }

  get eyeButtonPassword() {
    return $('#eye-button');
  }

  get buttonLogin() {
    return $('#login-button-submit');
  }

  get errorEmailMessage() {
    return $('#login-input-email-error');
  }

  get errorPasswordMessage() {
    return $('#login-input-password-error');
  }

  async singIn() {
    await this.linkLogin.click();
  }

  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.buttonLogin.click();
  }
}

module.exports = new LoginPage();
