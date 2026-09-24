const {test,expect} = require('@playwright/test');
test("Rahul Shetty Academy Client App Login - Assertion", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    // Enter email and password"
    const email = "lalganeshmamidi123@gmail.com"
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Jesus@143");
    // Click the login button
    await page.getByRole("button",{name:'Login'}).click();
    // Wait for the products to load
    await page.locator(".card-body b").first().waitFor();
    const productName = "iphone 13 pro";
    await page.locator(".card-body")
    .filter({hasText:productName})
    .getByRole('button',{name:'Add To Cart'}).click();
    //Click on the cart button
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    // check if the product is visible in the cart
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("iphone 13 pro")).toBeVisible();
    // click on the check out button
    await page.getByRole("button",{name:"Checkout"}).click();
    // // Enter the word one by one
    // await page.locator("[placeholder*='Country']").pressSequentially("ind");
    // // locating the dropdown
    // const dropDown = page.locator(".ta-results.list-group.ng-star-inserted");
    // //wait for the dropdown to be enabled
    // await dropDown.waitFor();
    // //Get the count of the dropdown options
    // const optionsCount = await dropDown.locator("button").count();
    // console.log(optionsCount);
    // for(let i=0; i<optionsCount; i++){
    //     const text = await dropDown.locator("button").nth(i).textContent();
    //     console.log(text);
    //     if(text===" India" ){
    //         await dropDown.locator("button").nth(i).click();
    //         break;
    //     }
    // }
    // await expect( page.locator('.user__name.mt-5 label[type="text"]')).toHaveText(email);
    // await page.locator('.btnn.action__submit.ng-star-inserted').click();
    // await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
    // const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    // console.log(orderId);
    // await page.locator("button[routerlink*='/dashboard/myorders']").click();
    // await page.locator("tbody").first().waitFor();
    // const rowContents = page.locator("tbody tr");
    // const rowCount = await rowContents.count();
    // console.log(rowCount);
    // for( let i=0; i<rowCount; i++){
    //     const rowOrderId= await rowContents.nth(i).locator("th").textContent();
    //     console.log(rowOrderId);
    //     if(orderId.includes(rowOrderId)){
    //         await rowContents.nth(i).locator(".btn.btn-primary").click();
    //         break;
    //     }
    // }
    // const orderIdDetails= await page.locator(".col-text").textContent();
    // expect(orderId.includes(orderIdDetails)).toBeTruthy();
    // await page.pause();
});
