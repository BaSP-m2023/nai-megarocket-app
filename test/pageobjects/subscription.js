class Subscription {
  get subcriptionAddButton() {
    return $('#admin-subscriptions-add-button');
  }

  get selectClassesInput() {
    return $('#admin-subscriptions-input-classes');
  }

  get selectMemberInput() {
    return $('#admin-subscriptions-input-members');
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

  get editSubscriptionIcon() {
    return $('#admin-subscriptions-icon-edit');
  }

  get updateButton() {
    return $('#admin-subscriptions-button-submit-form');
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
}

export default new Subscription();
