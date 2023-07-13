/* eslint-disable no-undef */
class RegisterPage {
  get titleregister() {
    return $('h2');
  }

  get inputFirstName() {
    return $('[id="sing-up-input-first-name"][type="text"]');
  }

  get inputLastName() {
    return $('[id="sing-up-input-last-name"][type="text"]');
  }

  get inputDni() {
    return $('[id="sing-up-input-dni"][type="number"]');
  }

  get inputPhone() {
    return $('[id="sing-up-input-phone"][type="number"]');
  }

  get inputEmail() {
    return $('[id="sing-up-input-email"][type="text"]');
  }

  get inputPassword() {
    return $('[id="sing-up-input-password"][type="password"]');
  }

  get inputCity() {
    return $('[id="sing-up-input-city"][type="text"]');
  }

  get inputDate() {
    return $('[id="sing-up-input-date"][type="date"]');
  }

  get inputPostalCode() {
    return $('[id="sing-up-input-postal-code"][type="number"]');
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
