/* eslint-disable no-undef */
class MemberPage {
  get inputFirstName() {
    return $('#member-input-first-name');
  }

  get inputLastName() {
    return $('#member-input-last-name');
  }

  get inputPhone() {
    return $('#member-input-phone');
  }

  get inputEmail() {
    return $('#member-input-email');
  }

  get inputCity() {
    return $('#member-input-city');
  }

  get inputDate() {
    return $('#member-input-date');
  }

  get inputPostalCode() {
    return $('#member-input-postal-code');
  }

  get inputMembership() {
    return $('#member-input-membership');
  }

  get btnEdit() {
    return $('#member-edit-button');
  }

  get btnCancel() {
    return $('#member-cancel-button');
  }

  get btnConfirm() {
    return $('#member-submit-button');
  }

  get inputSelectActivity() {
    return $('#activity');
  }

  get inputSelectActivityOptionBox() {
    return $('#member-schedule-select-activity-Box');
  }

  async fillForm() {
    await this.inputPhone.setValue('3415853663');
  }
}
module.exports = new MemberPage();
