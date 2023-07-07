class LogoutPage {
  get warningModal() {
    return $('#logout-modal > div');
  }

  get confirmLogoutButton() {
    return $('#logout-button-close-success-modal');
  }

  async logout() {
    await this.logoutButton.click();
  }

  async clickOnLogoutButton() {
    await this.confirmLogoutButton.click();
  }
}

module.exports = new LogoutPage();
