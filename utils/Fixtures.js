const base = require('@playwright/test');
const {request} = require('@playwright/test');
const {APIUtils} = require('./APIUtils.js');
const loginPayLoad={userEmail: "lalganeshmamidi123@gmail.com", userPassword: "Jesus@143"};
const orderPayLoad={orders: [{country: "British Indian Ocean Territory", productOrderedId: "6960ea76c941646b7a8b3dd5"}]}

exports.customtest = base.test.extend({
    authenticatedPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login", { waitUntil: 'domcontentloaded' });
        await page.locator("#userEmail").fill("lalganeshmamidi123@gmail.com");
        await page.locator("#userPassword").fill("Jesus@143");
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');
        await use(page);
        //tear down
        await context.close();
        await apiContext.dispose();
    },
    createOrder: async({},use)=>{
        const apiContext = await request.newContext();
        const apiUtils =  new APIUtils(apiContext,loginPayLoad);
        const response = await apiUtils.createOrder(orderPayLoad);
        use(response);
    },
    testDataForOrder: {
        productName: 'ADIDAS ORIGINAL'
    }
})