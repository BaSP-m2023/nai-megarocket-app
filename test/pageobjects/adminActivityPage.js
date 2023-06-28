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

export default new AdminActivityPage();

// url https://nai-megarocket-app.vercel.app/admins/activities
// url add https://nai-megarocket-app.vercel.app/admins/activities/form
// url update https://nai-megarocket-app.vercel.app/admins/activities/form/6490e3dd3fd75a7a9c2015dc
