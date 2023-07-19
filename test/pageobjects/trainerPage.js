/* eslint-disable no-undef */
class TrainerPage {
  get welcomeMessage() {
    return $('h2');
  }

  get inputFirstname() {
    return $('#trainer-input-first-name');
  }

  get inputPhone() {
    return $('#trainer-input-phone');
  }

  get inputDni() {
    return $('#trainer-input-dni');
  }

  get inputLastname() {
    return $('#trainer-input-last-name');
  }

  get inputCity() {
    return $('#trainer-input-city');
  }

  get inputEmail() {
    return $('#trainer-input-email');
  }

  get inputActivitySelector() {
    return $('#trainer-select-activity');
  }

  get btnEditProfile() {
    return $('#trainer-button-edit-form');
  }

  get btnCancelForm() {
    return $('#trainer-button-cancel-form');
  }

  get btnConfirmForm() {
    return $('#trainer-button-submit-form');
  }

  get modalClass() {
    return $('#trainer-input-first-name');
  }

  get modalClassTitle() {
    return $('#trainer-class-name');
  }

  get modalClassInformation() {
    return $('#trainer-class-information');
  }

  get modalClose() {
    return $('#trainer-close-modal');
  }

  async clickOnEditBtn() {
    await this.btnEditProfile.click();
  }

  async clickOnConfirmBtn() {
    await this.btnConfirmForm.click();
  }

  async clickOnCancelBtn() {
    await this.btnCancelForm.click();
  }

  async clickOnModalCloseBtn() {
    await this.modalClose.click();
  }
}

module.exports = new TrainerPage();
