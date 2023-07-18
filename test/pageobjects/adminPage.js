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

  get btnAddClass() {
    return $('[id="admin-classes-add-button"][type="button"]');
  }

  get btnAddMember() {
    return $('[id="admin-add-button"][type="button"]');
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

  get inputDayMonday() {
    return $('#admin-input-day-monday');
  }

  get inputHour() {
    return $('#admin-input-hour');
  }

  get inputHour13() {
    return $('#admin-input-hour-13:00');
  }

  get inputTrainer() {
    return $('#admin-input-trainer');
  }

  get inputTrainer01() {
    return $('#admin-input-trainer-1');
  }

  get inputActivity() {
    return $('#admin-input-activity');
  }

  get inputActivity00() {
    return $('#admin-input-activity-0');
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
    await this.inputActivityNameModal.setValue('Jump');
    await this.inputActivityDescriptionModal.setValue('High energy workout experience');
  }

  async fillFormAddClass() {
    await this.inputDay.click();
    await this.inputDayMonday.click();
    await this.inputHour.click();
    await this.inputHour13.click();
    await this.inputTrainer.click();
    await this.inputTrainer01.click();
    await this.inputActivity.click();
    await this.inputActivity00.click();
    await this.inputSlots.setValue('8');
  }
}

module.exports = new AdminPage();
