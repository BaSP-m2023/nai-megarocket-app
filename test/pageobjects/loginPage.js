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

  async login(username, password) {
    await this.inputUserName.setValue(username);
    await this.inputPassword.setValue(password);
    await this.buttonLogin.click();
  }
}

export default new LoginPage();
