const LoginPage = require("../pageobjects/loginPage");

describe("LoginPage", () => {
  it("should login with correct email and password", async  () => {
    await LoginPage.open("https://nai-megarocket-app.vercel.app/");
    await LoginPage.linkLogin.waitForDisplayed();
    await LoginPage.linkLogin.waitForEnabled();
    await LoginPage.singIn();
    await LoginPage.inputEmail.waitForDisplayed();
    await LoginPage.inputEmail.waitForEnabled();
    await LoginPage.inputPassword.waitForDisplayed();
    await LoginPage.inputPassword.waitForEnabled();
    await LoginPage.login("admin@gmail.com", "Firebase1!");
  });
});