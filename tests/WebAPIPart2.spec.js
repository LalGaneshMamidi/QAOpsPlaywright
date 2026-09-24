// Login UI --> .json
//test browser-->.json
const {test,expect} = require('@playwright/test');
let webContext;
test.beforeAll(async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("lalganeshmamidi123@gmail.com");
    await page.locator("#userPassword").fill("Jesus@143");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});


})
test("Rahul Shetty Academy Client App Login", async()=>
{
    const page = await webContext.newPage();
    page.goto("https://rahulshettyacademy.com/client/");
    const titles = page.locator(".card-body b");
    await expect(titles.first()).toBeVisible();
    const allTitles = await titles.allTextContents();
    console.log(allTitles);
});

test("Rahul Shetty Academy Client App - Placing the order", async()=>
{
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    // Wait for the products to load
    const titles = page.locator(".card-body b");
    // wait for the first title to be visible
    await expect(titles.first()).toBeVisible();
    // Get the text content of all titles
    const allTitles = await titles.allTextContents();
    console.log(allTitles);
    const productName = "ADIDAS ORIGINAL";
    const products = page.locator(".card-body");
    //Get the product count
    const count = await products.count();
    // Loop through the products and click Add To Cart for the product with the specified name
    for(let i=0; i<count ; i++){
        console.log(await products.nth(i).locator("b").textContent());
       if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
       }
    }
    // click on the cart button
    await page.locator("[routerlink*='cart']").click();
    // check if the product is visible in the cart
    await expect(page.locator("h3:has-text('" +productName+ "')")).toBeVisible();
    // wait for the cart to load
    //  await page.locator("div li").first().waitFor();
    // const bool = await page.locator("h3:has-text('"+productName+"')").isVisible();
    // expect(bool).toBeTruthy();
    // click on the check out button
    await page.locator("text=Checkout").click();
    // Enter the word one by one
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    // locating the dropdown
    const dropDown = page.locator(".ta-results.list-group.ng-star-inserted");
    //wait for the dropdown to be enabled
    await dropDown.waitFor();
    //Get the count of the dropdown options
    const optionsCount = await dropDown.locator("button").count();
    console.log(optionsCount);
    for(let i=0; i<optionsCount; i++){
        const text = await dropDown.locator("button").nth(i).textContent();
        console.log(text);
        if(text===" India" ){
            await dropDown.locator("button").nth(i).click();
            break;
        }
    }
    // await expect( page.locator('.user__name.mt-5 label[type="text"]')).toHaveText(email);
    await page.locator('.btnn.action__submit.ng-star-inserted').click();
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='/dashboard/myorders']").click();
    await page.locator("tbody").first().waitFor();
    const rowContents = page.locator("tbody tr");
    const rowCount = await rowContents.count();
    console.log(rowCount);
    for( let i=0; i<rowCount; i++){
        const rowOrderId= await rowContents.nth(i).locator("th").textContent();
        console.log(rowOrderId);
        if(orderId.includes(rowOrderId)){
            await rowContents.nth(i).locator(".btn.btn-primary").click();
            break;
        }
    }
    const orderIdDetails= await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    // await page.pause();
});
