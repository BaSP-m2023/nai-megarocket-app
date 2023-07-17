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
    return $(
      '#root > div.layout_center__DWPZJ > div > div.form_formContainer__czDrw > div.modal_modalOverlay__1DvR3 > div'
    );
  }
}

module.exports = new SuperAdminPage();
