class Login {
  get logIcon() {
    return $('#login-bar-link');
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

  async clickOnSubmitButton() {
    await this.submitButton.click();
  }

  async login(email, password) {
    await this.inputUsername.setValue(email);
    await this.inputPassword.setValue(password);
  }
}

export default new Login();
