class SubscriptionPage {
  get subscriptionTitle() {
    return $("#root > div > div > div > h2");
  }

  get subcriptionAddButton() {
    return $('#admin-subscriptions-add-button');
  }

  get selectClassesInput() {
    return $('#admin-subscriptions-input-classes');
  }

  get selectTrainersInput() {
    return $('#admin-subscriptions-input-trainers');
  }

  get backButtonSubscriptionForm() {
    return $('#admin-subscriptions-button-back-form');
  }

  get resetButtonSubscriptionForm() {
    return $('#admin-subscriptions-button-reset-form');
  }

  get crossfitClassOption() {
    return $('#admin-subscriptions-input-classes-Crossfit');
  }

  get mariaTrainerOption() {
    return $('#admin-subscriptions-input-members-maria');
  }

  get fernandoTrainerOption() {
    return $('#admin-subscriptions-input-members-Fernando');
  }

  get submitButton() {
    return $('#admin-subscriptions-button-submit-form');
  }

  get succesModal () {
    return $ ("#admin-subscriptions-form-modal > div");
  }

  get editSubscriptionIcon() {
    return $('#admin-subscriptions-icon-edit');
  }

  get deleteSubscriptionIcon() {
    return $('#admin-subscriptions-icon-delete');
  }

  get closeButton() {
    return $('#admin-subscriptions-button-close-success-modal');
  }
 
  get confirmButton() {
    return $('#admin-subscriptions-button-confirm-delete-modal');
  }

  async clickOnSubscriptionAddButton() {
    await this.subcriptionAddButton.click();
  }

  async selectClassAndTrainer(class, trainer) {
    await this.selectClassesInput.setValue(class);
    await this.selectTrainersInput.setValue(trainer);
  }
  async clickOnSubmitButton() {
    await this.submitButton.click();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }

  async clickOnEditSubscriptionIcon() {
    await this.editSubscriptionIcon.click();
  }

  async changeTrainer() {
    await this.selectTrainersInput.setValue(trainer);
  }

  async clickOnCloseButton() {
    await this.closeButton.click();
  }

  async clickOnDeleteSubscriptionIcon() {
    await this.deleteSubscriptionIcon();
  }
}

module.exports = new SubscriptionPage();
