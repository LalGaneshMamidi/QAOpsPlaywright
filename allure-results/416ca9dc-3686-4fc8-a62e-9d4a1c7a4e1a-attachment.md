# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CustomFixtures.spec.js >> fixtures demo
- Location: tests\CustomFixtures.spec.js:4:1

# Error details

```
ReferenceError: apiContext is not defined
```

# Test source

```ts
  1  | const base = require('@playwright/test');
  2  | const {request} = require('@playwright/test');
  3  | const {APIUtils} = require('./APIUtils.js');
  4  | const loginPayLoad={userEmail: "lalganeshmamidi123@gmail.com", userPassword: "Jesus@143"};
  5  | const orderPayLoad={orders: [{country: "British Indian Ocean Territory", productOrderedId: "6960ea76c941646b7a8b3dd5"}]}
  6  | 
  7  | exports.customtest = base.test.extend({
  8  |     authenticatedPage: async ({ browser }, use) => {
  9  |         const context = await browser.newContext();
  10 |         const page = await context.newPage();
  11 |         await page.goto("https://rahulshettyacademy.com/client/#/auth/login", { waitUntil: 'domcontentloaded' });
  12 |         await page.locator("#userEmail").fill("lalganeshmamidi123@gmail.com");
  13 |         await page.locator("#userPassword").fill("Jesus@143");
  14 |         await page.locator("[value='Login']").click();
  15 |         await page.waitForLoadState('networkidle');
  16 |         await use(page);
  17 |         //tear down
  18 |         await context.close();
> 19 |         await apiContext.dispose();
     |         ^ ReferenceError: apiContext is not defined
  20 |     },
  21 |     createOrder: async({},use)=>{
  22 |         const apiContext = await request.newContext();
  23 |         const apiUtils =  new APIUtils(apiContext,loginPayLoad);
  24 |         const response = await apiUtils.createOrder(orderPayLoad);
  25 |         use(response);
  26 |     },
  27 |     testDataForOrder: {
  28 |         productName: 'ADIDAS ORIGINAL'
  29 |     }
  30 | })
```