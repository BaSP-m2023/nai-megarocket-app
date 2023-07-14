/* eslint-disable no-undef */
class AdminProfilePage {
  get sectionTitle() {
    return $('h2');
  }

  get btnAdd() {
    return $('#admin-button-add');
  }

  get inputSearchTable() {
    return $('#table-input-search');
  }

  get iconEdit() {
    return $('#admin-icon-edit');
  }

  get iconDelete() {
    return $('#admin-icon-delete');
  }

  get btnPrevious() {
    return $('#table-button-previous');
  }

  get btnNext() {
    return $('#table-button-next');
  }

  get btnArrowBack() {
    return $('#admin-arrow-back');
  }

  get inputActivityNameModal() {
    return $('#admin-input-name');
  }

  get inputActivityDescriptionModal() {
    return $('#admin-input-description');
  }

  get btnSubmit() {
    return $('#admin-button-submit-form');
  }

  get btnActive() {
    return $('#admin-input-checkbox');
  }

  get btnCancel() {
    return $('#admin-button-close-modal');
  }

  get btnConfirm() {
    return $('#admin-button-confirm-modal');
  }

  get deleteModal() {
    return $('#admin-modal');
  }

  get inputDay() {
    return $('#admin-input-day');
  }

  get inputHour() {
    return $('#admin-input-hour');
  }

  get inputTrainer() {
    return $('#admin-input-trainer');
  }

  get inputActivity() {
    return $('#admin-input-activity');
  }

  get inputSlots() {
    return $('#admin-input-slots');
  }

  get inputFirstName() {
    return $('#admin-input-first-name');
  }

  get inputLastName() {
    return $('#admin-input-last-name');
  }

  get inputDni() {
    return $('#admin-input-dni');
  }

  get inputPhone() {
    return $('#admin-input-phone');
  }

  get inputEmail() {
    return $('#admin-input-email');
  }

  get inputPassword() {
    return $('#admin-input-password');
  }

  get inputCity() {
    return $('#admin-input-city');
  }

  get inputDate() {
    return $('#admin-input-date');
  }

  get inputPostalCode() {
    return $('#admin-input-zip');
  }

  get inputMembership() {
    return $('#admin-input-memebrship');
  }

  get inputSalary() {
    return $('#admin-input-salary');
  }

  get inputClasses() {
    return $('#admin-input-classes');
  }

  get inputMember() {
    return $('#admin-input-members');
  }

  get btnHistory() {
    return $('#admin-button-toggle-inactive');
  }
}

module.exports = new AdminProfilePage();
