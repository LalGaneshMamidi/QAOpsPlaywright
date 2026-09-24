const { test, expect } = require('@playwright/test');
test("@API Security Test Network Intercept", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("lalganeshmamidi123@gmail.com");
    await page.locator("#userPassword").fill("Jesus@143");
    await page.locator("[value='Login']").click();
    await page.locator(".card-body b").first().waitFor();
    await page.locator("[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6aaaaeab52cfef03ed0ec999"})
    )
    //Clcik any view button in the orders page
    await page.locator(".btn.btn-primary").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})


