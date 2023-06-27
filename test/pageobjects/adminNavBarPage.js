/* eslint-disable no-undef */
class AdminNavBarPage {
  open(url) {
    return browser.url(url);
  }

  get chooseAdminButton() {
    const buttons = $$('button.sideBar_button__nJ3d+');
    const adminButton = buttons[1];
    return adminButton;
  }
}

export default new AdminNavBarPage();
