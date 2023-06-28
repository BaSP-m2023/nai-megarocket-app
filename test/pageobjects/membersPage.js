class membersPage {
  get addMemberbtn() {
    return $('#admin-members-add-button');
  }
  get adminMemberTable() {
    return $('#admin-member-table');
  }
  get updateMemberBtn() {
    return $('#admin-member-icon-edit');
  }
  get deleteMemberBtn() {
    return $('#admin-member-icon-delete');
  }
  get memberUpdateForm() {
    return $('#root > div > div > div');
  }
  get firstNameMemberInput() {
    return $('#admin-members-input-first-name');
  }
  get lastNameMemberInput() {
    return $('#admin-members-input-last-name');
  }
  get dniMemberInput() {
    return $('#admin-members-input-dni');
  }
  get phoneNumberMemberInput() {
    return $('#admin-members-input-phone');
  }
  get emailMemberInput() {
    return $('#admin-members-input-email');
  }
  get passwordMemberInput() {
    return $('#admin-members-input-password');
  }
  get cityMemberInput() {
    return $('#admin-members-input-city');
  }
  get dateBirthMemberInput() {
    return $('#admin-members-input-date');
  }
  get postalCodeMemberInput() {
    return $('#admin-members-input-zip');
  }
  get membershipMemberInput() {
    return $('#admin-members-input-memebrship');
  }
  get activeMemberInput() {
    return $('#admin-members-input-checkbox');
  }

  get updMemberBtn() {
    return $('#admin-members-button-submit-form');
  }
  get backMemberBtn() {
    return $('#admin-members-button-back-form');
  }
  get resetMemberBtn() {
    return $('#admin-members-button-reset-form');
  }

  async memberForm(
    firstName,
    lastName,
    dni,
    phoneNumber,
    email,
    city,
    dateBirth,
    postalCode,
    password,
    active,
    membership
  ) {
    await this.firstNameMemberInput.setValue(firstName);
    await this.lastNameMemberInput.setValue(lastName);
    await this.dniMemberInput.setValue(dni);
    await this.phoneNumberMemberInput.setValue(phoneNumber);
    await this.emailMemberInput.setValue(email);
    await this.passwordMemberInput.setValue(password);
    await this.cityMemberInput.setValue(city);
    await this.dateBirthMemberInput.setValue(dateBirth);
    await this.postalCodeMemberInput.setValue(postalCode);
    await this.membershipMemberInput.setValue(membership);
    await this.activeMemberInput.setValue(active);
  }

  async addMemberbtnClick() {
    await this.addMemberBtn.click();
  }
  async updateMemberBtnClick() {
    await this.updateMemberBtn.click();
  }
  async deleteMemberBtnClick() {
    await this.deleteMemberBtn.click();
  }
  open() {
    return browser.url('https://nai-megarocket-app.vercel.app/');
  }
}
module.exports = new membersPage();
