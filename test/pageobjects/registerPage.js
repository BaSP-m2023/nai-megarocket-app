/* eslint-disable no-undef */
class RegisterPage {
  get titleregister() {
    return $('h2');
  }

  get inputFirstName() {
    return $('#sing-up-input-first-name');
  }

  get inputLastName() {
    return $('#sing-up-input-last-name');
  }

  get inputDni() {
    return $('#sing-up-input-dni');
  }

  get inputPhone() {
    return $('#sing-up-input-phone');
  }

  get inputEmail() {
    return $('#sing-up-input-email');
  }

  get inputPassword() {
    return $('#sing-up-input-password');
  }

  get inputCity() {
    return $('#sing-up-input-city');
  }

  get inputDate() {
    return $('#sing-up-input-date');
  }

  get inputPostalCode() {
    return $('#sing-up-input-postal-code');
  }

  get btnSignUp() {
    return $('#sing-up-button-add');
  }

  get btnBack() {
    return $('#sing-up-button-cancel');
  }

  get btnReset() {
    return $('#sing-up-button-reset');
  }

  async fillFormRegister(firstName, lastName, dni, phone, email, password, city, date, postalCode) {
    await browser.pause(2000);
    await this.inputFirstName.setValue(firstName);
    await this.inputLastName.setValue(lastName);
    await this.inputDni.setValue(dni);
    await this.inputPhone.setValue(phone);
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.inputCity.setValue(city);
    await this.inputDate.setValue(date);
    await this.inputPostalCode.setValue(postalCode);
  }

  async signUp() {
    await this.btnSignUp.click();
  }

  async backToLogin() {
    await this.btnBack.click();
  }

  async resetForm() {
    await this.btnReset.click();
  }
}

module.exports = new RegisterPage();
