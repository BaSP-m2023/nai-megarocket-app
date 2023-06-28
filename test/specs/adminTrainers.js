const LoginPage = require('../pageobjects/loginPage');
const NavBarPage = require('../pageobjects/navBarPage');
const TrainerPage = require('../pageobjects/trainerPage');
const LogoutPage = require('../pageobjects/logoutPage');

describe('Trainers CRUD', () => {
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

  it('Navigate to Trainers section', async () => {
    await NavBarPage.goToAdminSection();
    await NavBarPage.goToTrainersSubsection();
    await expect(TrainerPage.trainerTitle).toBeDisplayed();
  });

  it('Create a new trainer', async () => {
    await TrainerPage.clickOnTrainerAddButton();
    await TrainerPage.completeForm(
      'maria',
      'becerra',
      '40900100',
      '1234560987',
      'mari@gmail.com',
      'buenos aires',
      '50',
      'mariaB1!'
    );
    await TrainerPage.clickOnSumbitButton();
    await expect(TrainerPage.succesModal).toBeDisplayed();
    await TrainerPage.clickOnConfirmButton();
  });

  it('Update a trainer', async () => {
    await TrainerPage.clickOnEditIcon();
    await TrainerPage.changePhoneNumber();
    await TrainerPage.clickOnSumbitButton();
    await expect(TrainerPage.errorMessagePassword).toBeDisplayed();
    await expect(TrainerPage.errorMessagePassword).toHaveTextContaining('Password is required.');
    await TrainerPage.completePasswordInput();
    await TrainerPage.clickOnSumbitButton();
    await expect(TrainerPage.succesModal).toBeDisplayed();
    await TrainerPage.clickOnConfirmButton();
  });

  it('Delete a trainer', async () => {
    await TrainerPage.clickOnDeleteIcon();
    await expect(TrainerPage.deleteModal).toBeDisplayed();
    await TrainerPage.clickOnCancelButton();
    await TrainerPage.clickOnDeleteIcon();
    await expect(TrainerPage.deleteModal).toHaveTextContaining(
      'Are you sure you want to delete this trainer?'
    );
    await TrainerPage.clickOnConfirmDeleteButton();
    await expect(TrainerPage.deleteModal).toHaveTextContaining('Trainer deleted successfully');
    await TrainerPage.clickOnCloseButton();
  });

  it('Logout', async () => {
    await LogoutPage.logout();
    await expect(LogoutPage.warningModal).toBeDisplayed();
    await expect(LogoutPage.warningModal).toHaveTextContaining(
      'Are you sure you want to log out? :('
    );
    await LogoutPage.clickOnLogoutButton();
  });
});
