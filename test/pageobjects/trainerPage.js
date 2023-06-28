class TrainerPage {
  get trainerTitle() {
    return $('#root > div > div > div > h2');
  }

  get trainerAddButton() {
    return $('#root > div > #admin-trainer-add-button > div > h2');
  }

  get nameInput() {
    return $('#admin-trainers-input-first-name');
  }

  get lastNameInput() {
    return $('#admin-trainers-input-last-name');
  }

  get dniInput() {
    return $('#admin-trainers-input-dni');
  }

  get phoneNumberInput() {
    return $('#admin-trainers-input-phone');
  }

  get emailInput() {
    return $('#admin-trainers-input-email');
  }

  get cityInput() {
    return $('#admin-trainers-input-city');
  }

  get salaryInput() {
    return $('#admin-trainers-input-salary');
  }

  get passwordInput() {
    return $('#admin-trainers-input-password');
  }

  get isActiveInput() {
    return $('#admin-trainers-input-checkbox');
  }

  get submitButton() {
    return $('#admin-trainers-button-submit-form');
  }

  get confirmButton() {
    return $('#admin-trainers-form-button-confirm-modal');
  }

  get successModal() {
    return $('#admin-trainers-form-modal > div');
  }

  get editTrainerIcon() {
    return $('#admin-trainers-icon-edit');
  }

  get errorMessagePassword() {
    return $('#admin-trainers-input-password > p');
  }

  get deleteTrainerIcon() {
    return $('#admin-trainers-icon-delete');
  }

  get closeButton() {
    return $('#admin-trainers-button-close-success-modal');
  }

  get confirmDeleteButton() {
    return $('#admin-trainers-button-confirm-delete-modal');
  }

  get deleteModal() {
    return $('#admin-trainers-modal > div');
  }

  async clickOnTrainerAddButton() {
    await this.trainerAddButton.click();
  }

  async clickOnSumbitButton() {
    await this.submitButton.click();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }

  async clickOnEditIcon() {
    await this.editTrainerIcon.click();
  }

  async changePhoneNumber() {
    await this.phoneNumberInput.setValue('1234560978');
  }

  async completePasswordInput() {
    await this.passwordInput.setValue('mariaB1!');
  }

  async clickOnDeleteIcon() {
    await this.deleteTrainerIcon.click();
  }

  async clickOnCloseButton() {
    await this.cancelButton.click();
  }

  async clickOnConfirmDeleteButton() {
    await this.confirmDeleteButton.click();
  }

  async completeForm(firstName, lastName, dni, phone, email, city, salary, password) {
    await this.nameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.dniInput.setValue(dni);
    await this.phoneNumberInput.setValue(phone);
    await this.emailInput.setValue(email);
    await this.cityInput.setValue(city);
    await this.salaryInput.setValue(salary);
    await this.passwordInput.setValue(password);
    await this.isActiveInput.click();
  }
}

module.exports = new TrainerPage();
