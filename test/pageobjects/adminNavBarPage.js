/* eslint-disable no-undef */
class AdminNavBarPage {
  open(url) {
    return browser.url(url);
  }

  get adminButton() {
    return $$('li:first-child a:nth-child(3)')[0]; //selector provisorio, falta id
  }

  get activityButton() {
    return $$('li:first-child a:nth-child(3)')[0]; //selector provisorio, falta id
  }

  get classButton() {
    return $$('li:first-child a:nth-child(4)')[0]; //selector provisorio, falta id
  }
}

export default new AdminNavBarPage();
