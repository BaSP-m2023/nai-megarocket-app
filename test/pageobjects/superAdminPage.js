/* eslint-disable no-undef */
class SuperAdminPage {
  open(url) {
    return browser.url(url);
  }

  get logoHeader() {
    return $('#header-logo-link');
  }

  get logoutHeaderButton() {
    return $('#logout-bar-link');
  }

  get iconHeaderFacebook() {
    return $('#facebook-bar-link');
  }

  get iconHeaderTwitter() {
    return $('#twitter-bar-link');
  }

  get iconHeaderInstagram() {
    return $('#instagram-bar-link');
  }

  get sidebarAdminButton() {
    return $('#sidebar-link-super-admin-admins');
  }

  get titleAdmins() {
    return $('h2');
  }

  get addButton() {
    return $('#super-admin-add-button');
  }

  get searchInput() {
    return $('#table-input-search');
  }
}

export default new SuperAdminPage();
