/* eslint-disable no-undef */
class AdminNavBarPage {
  get btnHome() {
    return $('#sidebar-link-admin-home');
  }

  get btnProfile() {
    return $('#sidebar-link-admin-profile');
  }

  get btnActivity() {
    return $('#sidebar-link-admin-activities');
  }

  get btnClass() {
    return $('#sidebar-link-admin-classes');
  }

  get btnMember() {
    return $('#sidebar-link-admin-members');
  }

  get btnTrainer() {
    return $('#sidebar-link-admin-trainers');
  }

  get btnSubscriptions() {
    return $('#sidebar-link-admin-subscriptions');
  }

  get btnReports() {
    return $('#sidebar-link-admin-reports');
  }
}

module.exports = new AdminNavBarPage();
