/* eslint-disable no-undef */
class AdminClassPage {
  get addClassButton() {
    return $('#admin-classes-add-button');
  }

  get selectActivity() {
    return $('#activity');
  }

  get optionToSelectCrossfit() {
    return $('#admin-classes-select-activity-Crossfit');
  }

  get optionToSelectSpinning() {
    return $('#admin-classes-select-activity-Spinning');
  }

  get optionToSelectFunctional() {
    return $('#admin-classes-select-activity-Functional');
  }

  get optionToSelectBoxing() {
    return $('#admin-classes-select-activity-Boxing');
  }

  get optionToSelectGap() {
    return $('#admin-classes-select-activity-Gap');
  }

  get optionToSelectYoga() {
    return $('#admin-classes-select-activity-Yoga');
  }

  get optionToSelectZumba() {
    return $('#admin-classes-select-activity-Zumba');
  }

  async selectActivitySort(option) {
    await this.selectActivity.click();

    switch (option) {
      case 'Crossfit':
        await this.optionToSelectCrossfit.click();
        break;
      case 'Spinning':
        await this.optionToSelectSpinning.click();
        break;
      case 'Functional':
        await this.optionToSelectFunctional.click();
        break;
      case 'Boxing':
        await this.optionToSelectBoxing.click();
        break;
      case 'Gap':
        await this.optionToSelectGap.click();
        break;
      case 'Yoga':
        await this.optionToSelectYoga.click();
        break;
      case 'Zumba':
        await this.optionToSelectZumba.click();
    }
  }
}

module.exports = new AdminClassPage();
