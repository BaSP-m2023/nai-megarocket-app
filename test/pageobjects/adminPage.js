/* eslint-disable no-undef */
class AdminPage {
  get sectionTitle() {
    return $('h2');
  }

  get tableAdmin() {
    return $('#admin-table');
  }

  get btnEditProfile() {
    return $('#admin-edit-button');
  }

  get btnAddActivity() {
    return $('[id="admin-button-add-activity"][type="button"]');
  }

  get btnSubmitProfile() {
    return $('#admin-submit-button');
  }

  get btnAdd() {
    return $('#admin-button-submit-form');
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

  get iconEditActivity() {
    return $('#admin-icon-edit-5');
  }

  get iconDeleteActivity() {
    return $('#admin-icon-delete-5');
  }

  get inputActivityDescriptionModalUpdate() {
    return $('#admin-input-description');
  }

  get btnActive() {
    return $('#admin-input-checkbox');
  }

  get btnCancelModal() {
    return $('#admin-button-close-modal');
  }

  get btnConfirmModal() {
    return $('#admin-button-confirm-modal');
  }

  get btnDeleteModal() {
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

  async fillForm() {
    await this.inputPhone.setValue('3415853663');
  }

  async fillFormAddActivity() {
    await this.inputActivityNameModal.setValue('Zumba');
    await this.inputActivityDescriptionModal.setValue(
      'Is a fun, high-energy workout experience that keeps you excited'
    );
  }
}

module.exports = new AdminPage();
