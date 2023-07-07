class LoginPage {
  get loginLabel() {
    return $('#root > div > div > div');
  }

  get emailInput() {
    return $('#login-input-email');
  }

  get passwordInput() {
    return $('#login-input-password');
  }

  get errorMessage() {
    return $('#login-input-email-error');
  }

  get loginModalBtn() {
    return $('#login-button-submit');
  }

  async login(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
  }

  async loginModalBtnClick() {
    await this.loginModalBtn.click();
  }
}
module.exports = new LoginPage();
