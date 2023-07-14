/* eslint-disable no-undef */
class LoginPage {
  open(url) {
    return browser.url(url);
  }

  get btnLogin() {
    return $('#logout-bar-link');
  }

  get titleLogin() {
    return $('h2');
  }

  get inputEmail() {
    return $('#login-input-email');
  }

  get inputPassword() {
    return $('#login-input-password');
  }

  get eyeBtnPassword() {
    return $('#eye-button');
  }

  get linkForgotPassword() {
    return $('#login-button-forgot-password');
  }

  get linkCreateAccount() {
    return $('#login-button-create-account');
  }

  get errorMessageEmail() {
    return $('#login-input-email-error');
  }

  get errorMessagePassword() {
    return $('#login-input-password-error');
  }

  get btnSubmit() {
    return $('#login-button-submit');
  }

  get btnRegister() {
    return $('#login-button-register');
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
