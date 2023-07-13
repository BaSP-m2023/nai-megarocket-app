/* eslint-disable no-undef */
class AdminActivityPage {
  open(url) {
    return browser.url(url);
  }

  get addActivityButton() {
    return $('#admin-button-add-activity');
  }

  get activityTable() {
    return $('#admin-activities-table');
  }

  get updateActivitybutton() {
    return $('#admin-activities-icon-edit');
  }

  get deleteActivitybutton() {
    return $('#admin-activities-icon-delete');
  }
}

module.exports = new AdminActivityPage();
