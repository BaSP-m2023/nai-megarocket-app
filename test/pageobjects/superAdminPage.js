/* eslint-disable no-undef */
class SuperAdminPage {
  get iconEditSuperAdmin() {
    return $('#superadmin-admins-icon-edit');
  }

  get iconDeleteSuperAdmin() {
    return $('#superadmin-admins-icon-delete');
  }

  get btnAddSuperAdmin() {
    return $('#super-admin-add-button');
  }

  get btnCofirmAddSuperAdmin() {
    return $('#super-admin-button-add-admin');
  }

  get btnArrowSuperAdmin() {
    return 4('#super-admin-form-go-back');
  }

  get btnUpdateSuperAdmin() {
    return $('#super-admin-button-add-admin');
  }

  get btnChangePasswordSuperAdmin() {
    return $('#super-admins-admin-change-password-open-modal');
  }

  get btnConfirmChangePasswordSuperAdmin() {
    return $('#button-super-admin-admins-confirm-change-password');
  }

  get btnCancelChangePasswordSuperAdmin() {
    return $('#button-back-super-admin-admin-password-modal');
  }

  get btnEyeSuperAdmin() {
    return $('#eye-button');
  }

  get btnConfirmDeleteSuperAdmin() {
    return $('#super-admin-button-confirm-modal');
  }

  get btnCancelDeleteSuperAdmin() {
    return $('#super-admin-button-cancel-modal');
  }

  get btnPreviousSuperAdmin() {
    return $('#table-button-previous');
  }

  get btnNextSuperAdmin() {
    return $('#table-button-next');
  }

  get inputSearch() {
    return $('#table-input-search');
  }

  get inputFirstNameSuperAdmin() {
    return $('#super-admin-input-first-name');
  }

  get inputLastNameSuperAdmin() {
    return $('#super-admin-input-last-name');
  }

  get inputDniSuperAdmin() {
    return $('#super-admin-input-dni');
  }

  get inputPasswordSuperAdmin() {
    return $('#super-admin-input-password');
  }

  get inputCitySuperAdmin() {
    return $('#super-admin-input-city');
  }

  get inputEmailSuperAdmin() {
    return $('#super-admin-input-email');
  }

  get inputPhoneNumberSuperAdmin() {
    return $('#super-admin-input-phone-number');
  }

  get inputRepeatPasswordSuperAdmin() {
    return $('#:r26:');
  }

  get tableSuperAdmin() {
    return $('super-admin-table');
  }

  get modalSuperAdmin() {
    return $('super-admin-modal');
  }
}

module.exports = new SuperAdminPage();
