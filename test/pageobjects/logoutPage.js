/* eslint-disable no-undef */
class LogoutPage {
  get btnHeaderAvatar() {
    return $('#header-button-avatar');
  }

  get btnMyProfile() {
    return $('#my-profile-button-drop-down-menu');
  }

  get btnChatSupport() {
    return $('#chat-support-button-drop-down-menu');
  }

  get btnLogout() {
    return $('#logout-button-drop-down-menu');
  }

  get btnLogoutModalCancel() {
    return $('#logout-button-close-modal');
  }

  get btnLogoutModalConfirm() {
    return $('#logout-button-confirm-modal');
  }

  get dropDownMenu() {
    return $('#header-button-avatar > div.dropdown-menu.active');
  }

  async clickOnAvatarBtn() {
    await this.btnHeaderAvatar.click();
  }

  async clickOnlogoutBtn() {
    await this.btnLogout.click();
  }

  async clickOnConfirmLogoutBtn() {
    await this.btnLogoutModalConfirm.click();
  }
}

module.exports = new LogoutPage();
