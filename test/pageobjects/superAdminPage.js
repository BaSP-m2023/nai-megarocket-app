/* eslint-disable no-undef */
class SuperAdminPage {
  get iconEdit() {
    return $('#super-admin-icon-edit-0');
  }

  get iconDelete() {
    return $('#super-admin-icon-delete-0');
  }

  get btnAdd() {
    return $('#super-admin-add-button');
  }

  get btnSubmit() {
    return $('#super-admin-button-add-admin');
  }

  get btnGoBack() {
    return 4('#super-admin-form-go-back');
  }

  get btnChangePassword() {
    return $('#super-admins-admin-change-password-open-modal');
  }

  get btnConfirmChangePassword() {
    return $('#button-super-admin-admins-confirm-change-password');
  }

  get btnCancelChangePassword() {
    return $('#button-back-super-admin-admin-password-modal');
  }

  get btnEye() {
    return $('#eye-button');
  }

  get btnConfirmDelete() {
    return $('#super-admin-button-confirm-modal');
  }

  get btnCancelDelete() {
    return $('#super-admin-button-cancel-modal');
  }

  get btnPrevious() {
    return $('#pagination-button-0');
  }

  get btnNext() {
    return $('#pagination-button-2');
  }

  get inputFirstName() {
    return $('#super-admin-input-first-name');
  }

  get inputLastName() {
    return $('#super-admin-input-last-name');
  }

  get inputDni() {
    return $('#super-admin-input-dni');
  }

  get inputSearch() {
    return $('#input-table-search');
  }

  get inputCity() {
    return $('#super-admin-input-city');
  }

  get inputEmail() {
    return $('#super-admin-input-email');
  }

  get inputPhoneNumber() {
    return $('#super-admin-input-phone-number');
  }

  get inputPassword() {
    return $('#super-admin-input-password');
  }

  get inputChangePassword() {
    return $('#super-admin-input-password-change');
  }

  get inputRepeatPassword() {
    return $('#super-admin-input-repeat-password-change');
  }

  get tableSuperAdmin() {
    return $('super-admin-table');
  }

  get modalSuperAdmin() {
    return $('#super-admin-delete-modal');
  }

  async clickOnAddBtn() {
    await this.btnAdd.click();
  }

  async fillAdminForm(firstname, lastname, dni, password, email, phone, city) {
    await browser.pause(2000);
    await this.inputFirstName.setValue(firstname);
    await this.inputLastName.setValue(lastname);
    await this.inputDni.setValue(dni);
    await this.inputPassword.setValue(password);
    await this.inputEmail.setValue(email);
    await this.inputPhoneNumber.setValue(phone);
    await this.inputCity.setValue(city);
  }

  async clickOnSubmitBtn() {
    await this.btnSubmit.click();
  }

  async clickOnEditIcon() {
    await this.iconEdit.click();
  }

  async clickOnChangePasswordBtn() {
    await this.iconEdit.click();
  }

  async changePhoneNumber(newPhone) {
    await this.inputPhoneNumber.setValue(newPhone);
  }

  async changePassword(oldPass, newPass) {
    await this.inputChangePassword.setValue(oldPass);
    await this.inputRepeatPassword.setValue(newPass);
  }

  async clickOnConfirmBtn() {
    await this.btnConfirmChangePassword.click();
  }

  async clickOnDeleteIcon() {
    await this.iconDelete.click();
  }

  async clickOnConfirmDelete() {
    await this.btnConfirmDelete.click();
  }

  async searching(name) {
    await this.inputSearch.setValue(name);
  }
}

module.exports = new SuperAdminPage();
