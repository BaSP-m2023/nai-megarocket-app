/* eslint-disable no-undef */
class NavBarPage {
  get btnHomeadmin() {
    return $('#sidebar-link-admin-home');
  }

  get btnHomeMember() {
    return $('#sidebar-link-member-home');
  }

  get btnHomeTrainer() {
    return $('#sidebar-link-trainer-home');
  }

  get btnProfileAdmin() {
    return $('#sidebar-link-admin-profile');
  }

  get btnProfileMember() {
    return $('#sidebar-link-member-profile');
  }

  get btnProfileTrainer() {
    return $('#sidebar-link-trainer-profile');
  }

  get btnActivityAdmin() {
    return $('#sidebar-link-admin-activities');
  }

  get btnActivityMember() {
    return $('#sidebar-link-member-activities');
  }

  get btnClassAdmin() {
    return $('#sidebar-link-admin-classes');
  }

  get btnClassTrainer() {
    return $('#sidebar-link-trainer-classes');
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

  get btnSchedule() {
    return $('#sidebar-link-member-schedule');
  }

  get btnReports() {
    return $('#sidebar-link-admin-reports');
  }

  get btnMembership() {
    return $('#sidebar-link-member-memberships');
  }
}

module.exports = new NavBarPage();
