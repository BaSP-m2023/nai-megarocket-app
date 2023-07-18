/* eslint-disable no-undef */
class AdminPage {
  // titulo de seccion
  get sectionTitle() {
    return $('h2');
  }
  // id de tabla
  get tableAdmin() {
    return $('#admin-table');
  }
  //id agregar general
  get btnAdd() {
    return $('#admin-button-submit-form');
  }
  // id boton activo
  get btnActive() {
    return $('#admin-input-checkbox');
  }
  // id agregar nueva actividad
  get btnAddActivity() {
    return $('[id="admin-button-add-activity"][type="button"]');
  }
  // id agregar nueva clase
  get btnAddClass() {
    return $('[id="admin-classes-add-button"][type="button"]');
  }
  // id agregar nuevo miembro
  get btnAddMember() {
    return $('[id="admin-add-button"][type="button"]');
  }
  // id agregar nuevo entrenador
  get btnAddTrainer() {
    return $('[id="XXXXXXXXX"][type="button"]'); //falta ID
  }
  // id agregar nueva subscripcion
  get btnAddSubscription() {
    return $('[id="admin-add-button"][type="button"]');
  }
  // id boton ir hacia atras
  get btnArrowBack() {
    return $('#admin-form-go-back');
  }
  // id boton cancelan dentro del modal
  get btnCancelModal() {
    return $('#admin-button-close-modal');
  }
  // id boton de confirmar en el modal
  get btnConfirmModal() {
    return $('#admin-button-confirm-modal');
  }
  // id boton de elminar en el modal
  get btnConfirmModalMember() {
    return $('#admin-button-confirm-delete-modal');
  }

  get btnDeleteModal() {
    return $('#admin-modal');
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

  get containerFormClasses() {
    return $('#menu-day');
  }

  get iconEdit() {
    return $('#admin-icon-edit');
  }

  get iconEditActivity() {
    return $('#admin-icon-edit-5');
  }

  get iconEditMember() {
    return $('#admin-icon-edit-XX');
  }

  get iconEditSubscription() {
    return $('#admin-icon-edit-4');
  }

  get iconDelete() {
    return $('#admin-icon-delete');
  }

  get iconDeleteActivity() {
    return $('#admin-icon-delete-5');
  }

  get iconDeleteMember() {
    return $('#admin-icon-delete-XX');
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

  get inputHour() {
    return $('#admin-input-hour');
  }

  get inputHour13() {
    return $('#admin-input-hour-13-00');
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

  get selectClassActivityAjedrez() {
    return $('#admin-classes-select-activity-ajedrez');
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
    await this.containerFormClasses.click();
    await browser.pause(1000);
    await this.inputActivity.click();
    await this.inputActivity00.click();
    await browser.pause(1000);
    await this.inputHour.click();
    await this.inputHour13.click();
    await this.inputSlots.setValue('8');
    await this.inputTrainer.click();
    await this.inputTrainer01.click();
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
    await this.btnActive.click();
  }

  async filterClass() {
    await this.selectClassActivity.click();
    await this.selectClassActivityAjedrez.click();
  }
}

module.exports = new AdminPage();
