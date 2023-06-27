class LoginPage {
  get logIcon() {
    return $('#login-bar-link');
  }

  get loginForm() {
    return $('#root > div > div > div > form');
  }

  get emailInput() {
    return $('#login-input-email');
  }

  get passwordInput() {
    return $('#login-input-password');
  }

  get emailErrorMessage() {
    return $('#login-input-email-error');
  }

  get passwordErrorMessage() {
    return $('#login-input-password-error');
  }

  get submitButton() {
    return $('#login-button-submit');
  }

  async clickOnLoginIcon() {
    await this.logIcon.click();
  }

  async login(email, password) {
    await this.inputUsername.setValue(email);
    await this.inputPassword.setValue(password);
  }

  async clickOnSubmitButton() {
    await this.submitButton.click();
  }
}

module.exports = new LoginPage();
