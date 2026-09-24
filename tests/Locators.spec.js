const {test,expect} = require('@playwright/test');
test('playwrigh native locators and test level timeout',async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("12345");
    await page.getByRole("button",{name:'Submit'}).click();
    //Step Level-->5 seconds default timeout for expect assertions and if client approved it is slow and it is ok to take 7 sec, then we can override using {timeour:10000}
    await expect(page.getByText("The Form has been submitted successfully!.")).toBeVisible({timeout:10_1000});
    await page.getByRole("link",{name: 'close'}).click();
    await page.getByRole("link",{name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText:'iphone X'}).getByRole("button").click();
});
// default playwright waits 30 sec for complete test to run, if not it fails automatically if you think test takes longer than 30 sec, you have change the time in config file
test('playwright Test Level Timeout',async({page})=>
{
    test.setTimeout(60000);
    const slowExpect=expect.configure({timeout:9000});
    page.setDefaultTimeout(60000);
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("12345");
    await page.getByRole("button",{name:'Submit'}).click();// 10 sec
    await slowExpect(page.getByText("The Form has been submitted successfully!.")).toBeVisible();
    await page.getByRole("link",{name: 'close'}).click();
    //Global-->Test-->Step
    await page.getByRole("link",{name: 'Shop'}).click({timeout:15000});//15 sec
    await page.locator("app-card").filter({hasText:'iphone X'}).getByRole("button").click();
});