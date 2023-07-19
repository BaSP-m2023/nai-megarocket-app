/* eslint-disable no-undef */
class AdminPage {
  get sectionTitle() {
    return $('h2');
  }

  get tableAdmin() {
    return $('#admin-table');
  }

  get btnAdminSubmit() {
    return $('#admin-button-submit-form');
  }

  get btnActive() {
    return $('#admin-input-checkbox');
  }

  get btnAddActivity() {
    return $('[id="admin-button-add-activity"][type="button"]');
  }

  get btnAddClass() {
    return $('[id="admin-classes-add-button"][type="button"]');
  }

  get btnAddMember() {
    return $('[id="admin-add-button"][type="button"]');
  }

  get btnAddTrainer() {
    return $('[id="admin-add-button"][type="button"]');
  }

  get btnAddSubscription() {
    return $('[id="admin-add-button"][type="button"]');
  }

  get btnAdminEditClass() {
    return $('#admin-classes-button-edit-modal');
  }

  get btnArrowBack() {
    return $('#admin-form-go-back');
  }

  get btnCancelModal() {
    return $('#admin-button-close-modal');
  }

  get btnConfirmModal() {
    return $('#admin-button-confirm-modal');
  }

  get btnConfirmModalMember() {
    return $('#admin-button-confirm-delete-modal');
  }

  get btnConfirmModalTrainer() {
    return $('#admin-button-confirm-delete-modal');
  }

  get btnDeleteModal() {
    return $('#admin-modal');
  }

  get btnAdminDeleteClass() {
    return $('#admin-classes-button-delete-modal');
  }

  get btnEditProfile() {
    return $('#admin-edit-button');
  }

  get btnHistory() {
    return $('#subscription-button-history');
  }

  get btnNext() {
    return $('#pagination-button-3');
  }

  get btnNext2() {
    return $('[data-testid="NavigateNextIcon"]');
  }

  get btnPrevious() {
    return $('#pagination-button-0');
  }

  get btnPrevious2() {
    return $('#pagination-button-1');
  }

  get btnReportsSubscriptions() {
    return $('#admin-button-report-subscription');
  }

  get btnReportsMembers() {
    return $('#admin-button-report-member');
  }

  get btnReportsActivities() {
    return $('#admin-button-report-trainer');
  }

  get btnSelectSchedule() {
    return $(
      '#root > div.layout_center__DWPZJ > div.container_container__xTUOV > div.classes_container__nL4wZ > table > tbody > tr:nth-child(6) > td:nth-child(2) > div'
    );
  }

  get btnSubmit() {
    return $('#admin-submit-button');
  }

  get containerFormClasses() {
    return $('#menu-day');
  }

  get iconEdit() {
    return $('#admin-icon-edit');
  }

  get iconEditActivity() {
    return $('#admin-icon-edit-0');
  }

  get iconEditMember() {
    return $('#admin-icon-edit-0');
  }

  get iconEditSubscription() {
    return $('#admin-icon-edit-4');
  }

  get iconDelete() {
    return $('#admin-icon-delete');
  }

  get iconDeleteActivity() {
    return $('#admin-icon-delete-0');
  }

  get iconDeleteMember() {
    return $('#admin-icon-delete-0');
  }

  get iconDeleteTrainer() {
    return $('#admin-icon-delete-0');
  }

  get inputActivityNameModal() {
    return $('#admin-input-name');
  }

  get inputActivityDescriptionModal() {
    return $('#admin-input-description');
  }

  get inputActivityDescriptionModalUpdate() {
    return $('#admin-input-description');
  }

  get inputDay() {
    return $('#admin-input-day');
  }

  get inputDayMonday() {
    return $('#admin-input-day-monday');
  }

  get inputDayWednesday() {
    return $('#admin-input-day-wednesday');
  }

  get inputDayFriday() {
    return $('#admin-input-day-friday');
  }

  get inputHour() {
    return $('#admin-input-hour');
  }

  get inputHour13() {
    return $('#admin-input-hour-13-00');
  }

  get inputTrainer() {
    return $('#admin-input-trainer');
  }

  get inputTrainerLuciano() {
    return $('#admin-input-trainer-1');
  }

  get inputActivity() {
    return $('#admin-input-activity');
  }

  get inputActivityBoxing() {
    return $('#admin-input-activity-4');
  }

  get inputSearchTable() {
    return $('#input-table-search');
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
    return $('#admin-input-membership');
  }

  get inputMembershipClassic() {
    return $('#admin-input-membership-Classic');
  }

  get inputSalary() {
    return $('#admin-input-salary');
  }

  get inputClasses() {
    return $('#admin-input-classes');
  }

  get inputClasses01() {
    return $('#admin-input-classes-64a50a98d529825366e92e9e');
  }

  get inputMember() {
    return $('#admin-input-members');
  }

  get selectClassActivity() {
    return $('#admin-select-activity');
  }

  get selectClassActivityBoxing() {
    return $('#admin-classes-select-activity-boxing');
  }

  get selectClassTrainer() {
    return $('#admin-select-trainer');
  }

  get selectClassTrainerLuciano() {
    return $('#admin-classes-select-trainer-Luciano');
  }

  async fillForm() {
    await this.inputPhone.setValue('3415853664');
  }

  async fillFormAddActivity() {
    await this.inputActivityNameModal.setValue('Jump');
    await this.inputActivityDescriptionModal.setValue('High energy workout experience');
  }

  async fillFormAddClass() {
    await this.inputDay.click();
    await this.inputDayMonday.click();
    await this.containerFormClasses.click();
    await this.inputActivity.click();
    await this.inputActivityBoxing.click();
    await browser.pause(1000);
    await this.inputHour.click();
    await this.inputHour13.click();
    await this.inputSlots.setValue('8');
    await this.inputTrainer.click();
    await this.inputTrainerLuciano.click();
  }

  async fillFormAddTrainer() {
    await this.inputFirstName.setValue('Maria');
    await this.inputLastName.setValue('Becerra');
    await this.inputDni.setValue('40900100');
    await this.inputPhone.setValue('1234560987');
    await this.inputEmail.setValue('mariaBecerra@gmail.com');
    await this.inputCity.setValue('Buenos Aires');
    await this.inputSalary.setValue('50');
    await this.inputPassword.setValue('MariaB1!');
  }

  async fillFormAddMember() {
    await this.inputFirstName.setValue('Pedro');
    await this.inputLastName.setValue('Pascal');
    await this.inputDni.setValue('20369963');
    await this.inputPhone.setValue('3417897897');
    await this.inputEmail.setValue('pedropascal@gmail.com');
    await this.inputPassword.setValue('Pass551!');
    await this.inputCity.setValue('Rosario');
    await this.inputDate.setValue('12-10-1980');
    await this.inputPostalCode.setValue('2000');
    await this.inputMembership.click();
    await this.inputMembershipClassic.click();
  }

  async filterClass() {
    await this.selectClassActivity.click();
    await this.selectClassActivityAjedrez.click();
  }
}

module.exports = new AdminPage();
