class NavBarPage {
  get adminSection() {
    return $('#root > div > aside > nav > ul > button:nth-child(2)');
  }

  get subscriptionSubSection() {
    return $('#root > div > aside > nav > ul > li:nth-child(6) > a');
  }

  get trainersSubSection() {
    return $('#root > div > aside > nav > ul > li:nth-child(7) > a');
  }

  get logoutButton() {
    return $('#root > div > aside > nav > ul > li:nth-child(9) > a');
  }

  async goToAdminSection() {
    await this.adminSection.click();
  }

  async goToSubscriptionsSubsection() {
    await this.subscriptionSubSection.click();
  }

  async goToTrainersSubsection() {
    await this.trainersSubSection.click();
  }
}

module.exports = new NavBarPage();
