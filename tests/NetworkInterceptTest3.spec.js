const {test,expect}=require('@playwright/test')
test("UI Controls", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await page.route('**/*.{jpg,jpeg,png}',route=>route.abort());
    const userName=page.locator("#username")
    const password=page.locator("#password")
    const signInBtn=page.locator("#signInBtn")
    const checkBox=page.locator("[type='checkbox']")
    const cardTitles=page.locator(".card-body a");
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click()
    page.on('request',request=>console.log(request.url()));
    page.on('response',response=>console.log(response.url(),response.status()));
    await expect(page.locator(".card-body a")).toHaveCount(4);
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allCardTitles = await cardTitles.allTextContents();
    console.log(allCardTitles);
    await page.pause();
});