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
}

module.exports = new LogoutPage();
