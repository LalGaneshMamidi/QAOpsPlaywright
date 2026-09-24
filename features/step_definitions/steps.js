const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
Given('a log in to ecommerce application with {string} and {string}', { timeout: 10 * 1000 }, async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});
When('Add {string} to the Cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});
Then('Verify {string} is displayed in the Cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkOutProduct();
});

When('Enter valid details and place the order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReveiwPage();
    await ordersReviewPage.searchCountryAndSelect("ind", " India");
    this.orderId = await ordersReviewPage.submitAndGetOrderId()
    console.log(this.orderId);
});
Then('Verify order is present in the orders history page', async function () {
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
})

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    const userName = this.page.locator("#username")
    const passWord = this.page.locator("#password")
    const signInBtn = this.page.locator("#signInBtn")
    await userName.fill(username);
    await passWord.fill(password);
    await signInBtn.click();

});

Then('Verfiy error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect username/password.');

});