const LoginPage = require('../pageobjects/loginPage');
const NavBarPage = require('../pageobjects/navBarPage');
const SubscriptionPage = require('../pageobjects/subscriptionPage');

describe('Subscription CRUD', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1366, 768);
    browser.url('https://nai-megarocket-app.vercel.app/');
  });

  it('Login', async () => {
    await LoginPage.clickOnLoginIcon();
    await expect(Login.loginForm).toBeDisplayed();
    await LoginPage.login('admingmail.com', 'Firebase1');
    await expect(LoginPage.emailErrorMessage).toBeDisplayed();
    await expect(LoginPage.PasswordErrorMessage).toBeDisplayed();
    await LoginPage.login('admin@gmail.com', 'Firebase1!');
    await LoginPage.clickOnSubmitButton();
  });

  it('Navigate to subscription section', async () => {
    await NavBarPage.goToAdminSection();
    await NavBarPage.goToSubscriptionsSubsection();
    await expect(SubscriptionPage.subscriptionTitle).toBeDisplayed();
  });

  it('Create a new subscription', async () => {
    await SubscriptionPage.clickOnSubscriptionAddButton();
    await SubscriptionPage.selectClassAndTrainer(
      SubscriptionPage.crossfitClassOption,
      SubscriptionPage.mariaTrainerOption
    );
    await SubscriptionPage.clickOnSubmitButton();
    await expect(SubscriptionPage.succesModal).toBeDisplayed();
    await SubscriptionPage.clickOnConfirmButton();
  });

  it('Update a subscription', async () => {
    await SubscriptionPage.clickOnEditSubscriptionIcon();
    await SubscriptionPage.changeTrainer(SubscriptionPage.fernandoTrainerOption);
    await SubscriptionPage.clickOnSubmitButton();
    await expect(SubscriptionPage.succesModal).toBeDisplayed();
  });

  it('Delete a subscription', async () => {
    await SubscriptionPage.clickOnDeleteSubscriptionIcon();
    await expect(SubscriptionPage.succesModal).toBeDisplayed();
    await expect(SubscriptionPage.succesModal).toHaveTextContaining(
      'Do you want to delete this subscription?'
    );
    await SubscriptionPage.clickOnCloseButton();
    await SubscriptionPage.clickOnDeleteSubscriptionIcon();
    await SubscriptionPage.clickOnConfirmButton();
    await SubscriptionPage.clickOnCloseButton();
  });
});

module.exports = new AdminSubscriptions();