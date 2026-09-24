const { test, expect } = require('@playwright/test');
const { serialize } = require('v8');
// test.describe.configure({mode:'parallel'});
test.describe.configure({mode:'serial'});
test('Pop Up Validations', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com/");
    await page.goBack();
    await page.goForward();
    await page.goBack();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.getByRole("button", { name: "Hide" }).click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.getByRole("button", { name: "Mouse Hover" }).hover();
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.getByRole("link", { name: "All Access plan" }).click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
});

test("Screenshot & Visual Comparision", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/",{waitUntil:'domcontentloaded'});
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.screenshot({path:'Displayscreenshot.png'});
    await page.locator('#displayed-text').screenshot({path:'partialscreenshot.png'});
    await page.getByRole("button", { name: "Hide" }).click();
    await page.screenshot({path:'screenshot.png'});
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
})

test("Visual Testing",async({page})=>{
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('google.png');
})