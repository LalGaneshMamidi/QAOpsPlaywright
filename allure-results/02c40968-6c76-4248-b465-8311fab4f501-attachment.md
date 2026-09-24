# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppPOM.spec.js >> @web Client App login
- Location: tests\ClientAppPOM.spec.js:30:1

# Error details

```
Error: locator.click: Test ended.
Call log:
  - waiting for locator('text=Checkout')

```

# Test source

```ts
  1  | const {expect} = require('@playwright/test');
  2  | class CartPage{
  3  |     constructor(page){
  4  |         this.page=page;
  5  |         this.cartProducts = page.locator("div li").first();
  6  |         this.checkOutBtn = page.locator("text=Checkout");
  7  |     }
  8  |     async checkOutProduct(){
> 9  |         this.checkOutBtn.click();
     |                          ^ Error: locator.click: Test ended.
  10 |     }
  11 |     async verifyProductIsDisplayed(productName){
  12 |         await this.cartProducts.waitFor();
  13 |         await expect(this.page.locator("h3:has-text('" +productName+ "')")).toBeVisible();
  14 |     }
  15 | 
  16 | }
  17 | module.exports = {CartPage};
```