const { test, expect } = require('@playwright/test');
const { POManager } = require('../POM/POManager');
const {customtest} = require('../utils/TestData');
//json-->string-->js object
const dataset = JSON.parse(JSON.stringify(require('../utils/PlaceOrderTestData.json')));
for (const data of dataset) {

    test(`Client App login for ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.userName, data.password);
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();
        const cartPage = poManager.getCartPage();
        await cartPage.verifyProductIsDisplayed(data.productName);
        await cartPage.checkOutProduct();
        const ordersReviewPage = poManager.getOrdersReveiwPage();
        await ordersReviewPage.searchCountryAndSelect("ind", " India");
        const orderId = await ordersReviewPage.submitAndGetOrderId()
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });
}

customtest('@web Client App login', async ({ page, testDataforOrder}) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(testDataforOrder.userName, testDataforOrder.password);
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(testDataforOrder.productName);
        await dashboardPage.navigateToCart();
        const cartPage = poManager.getCartPage();
        await cartPage.verifyProductIsDisplayed(testDataforOrder.productName);
        await cartPage.checkOutProduct();
    });

//test files will trigger parallel
//Individual tests in that file will run in sequence
