/* eslint-disable no-undef */
class AdminNavBarPage {
  open(url) {
    return browser.url(url);
  }

  get adminButton() {
    return $$('.button.sideBar_button__nJ3d+')[1]; //selector provisorio, faltan implementar IDs
  }

  get activityOptionButton() {
    return $$('li:first-child a:nth-child(3)')[0]; //selector provisorio, faltan implementar IDs
  }

  get classOptionButton() {
    return $$('li:first-child a:nth-child(4)')[0]; //selector provisorio, faltan implementar IDs
  }
}

module.exports = new AdminNavBarPage();
