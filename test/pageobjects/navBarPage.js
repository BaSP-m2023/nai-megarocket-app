class NavBarPage {
  get navBarDisplayed() {
    return $('#root > div > aside > nav');
  }
  get adminBtn() {
    return $('#root > div > aside > nav > ul > button:nth-child(2)');
  }
  get membersAdminBtn() {
    return $('#root > div > aside > nav > ul > li:nth-child(2) > a');
  }
  get profileAdminBtn() {
    return $('#root > div > aside > nav > ul > li:nth-child(5) > a');
  }

  async adminBtnClick() {
    await this.adminBtn.click();
  }
  async membersAdmBtnClick() {
    await this.membersAdminBtn.click();
  }
  async profileAdminBtnClick() {
    await this.profileAdminBtn.click();
  }
}
module.exports = new NavBarPage();
