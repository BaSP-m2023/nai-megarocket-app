class ProfilePage {
  get adminDataForm() {
    return $('#root > div > div > div');
  }
  get adminDataTitle() {
    return $('#root > div > div > div > h2');
  }
  get nameInput() {
    return $('#admin-profile-input-first-name');
  }
  get lastNameInput() {
    return $('#admin-profile-input-last-name');
  }
  get dniInput() {
    return $('#admin-profile-input-dni');
  }
  get phoneNumberInput() {
    return $('#admin-profile-input-phone');
  }
  get emailInput() {
    return $('#admin-profile-input-email');
  }
  get cityInput() {
    return $('#admin-profile-input-city');
  }
  get passwordInput() {
    return $('#admin-profile-input-password');
  }
  get editBtn() {
    return $('#root > div > div > div > form > div.profile_buttonContainer__cFO-r > button');
  }

  async adminForm(name, lastName, dni, phoneNumber, email, city, password) {
    await this.nameInput.setValue(name);
    await this.lastInput.setValue(lastName);
    await this.dniInput.setValue(dni);
    await this.phoneNumberInput.setValue(phoneNumber);
    await this.emailInput.setValue(email);
    await this.cityInput.setValue(city);
    await this.passwordInput.setValue(password);
  }

  async editBtnClick() {
    await this.editBtn.click();
  }
  open() {
    return browser.url('https://nai-megarocket-app.vercel.app/');
  }
}
module.exports = new ProfilePage();
