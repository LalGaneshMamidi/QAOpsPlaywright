const {test,expect} = require('@playwright/test');
test("Browser context playwright test", async({browser})=> //Here browser is a fixture provided by playwright alos called as global variable.
{
    //playwright code
    //Chrome -->Plugins/cookies/Cache
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/");
    console.log(await page.title());
});

test("Page Playwright test", async({page})=>
{
    await page.goto("https://google.com/");
    //Get the title --assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test(" @web UI Controls", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const userName=page.locator("#username")
    const password=page.locator("#password")
    const signInBtn=page.locator("#signInBtn")
    const checkBox=page.locator("[type='checkbox']")
    const cardTitles=page.locator(".card-body a");
    await userName.fill("lalganeshmamidi123@gmail.com");
    await password.fill("lalganeshmamidi123");
    await checkBox.check();
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();
    await expect(page.locator(".card-body a")).toHaveCount(4);
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allCardTitles = await cardTitles.allTextContents();
    console.log(allCardTitles);
});

test("Log in Practise",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName=page.locator("#username");
    const password=page.locator("#password");
    const signInBtn=page.locator("#signInBtn");
    const radioBtns=page.locator(".radiotextsty");
    const dropDown=page.locator("select.form-control");
    const checkBox=page.locator("#terms");
    const documentLink=page.locator("[href*='https://rahulshettyacademy.com/documents-request']");
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await dropDown.selectOption("consult");
    await radioBtns.last().click();
    await expect(radioBtns.last()).toBeChecked();
    console.log(await radioBtns.last().isChecked());
    await page.locator("#okayBtn").click();
    await checkBox.check();
    await expect(checkBox).toBeChecked();
    await page.locator("#terms").uncheck();
    await expect(checkBox).not.toBeChecked();
    expect(await checkBox.isChecked()).toBeFalsy();
    console.log(await checkBox.isChecked());
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    //assertions
    // await page.pause();

});

test("Child Window Handling",async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink=page.locator("[href*='https://rahulshettyacademy.com/documents-request']");

    const [newPage] = await Promise.all([// promises are used to handle multiple asynchronous operations in parallel. In this case, we are waiting for two things to happen simultaneously: the new page event and the click action on the document link.
        context.waitForEvent('page'), //Listen for the new page event
        documentLink.click()
    ]);
    const text = await newPage.locator(".im-para.red").textContent();
    console.log(text);
    const arrayText=text.split("@");
    const domain=arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").textContent());//textContent is used to get the text content of an element, but it does not retrieve the value of an input field. To get the value of an input field, you should use the inputValue() method instead.
    console.log(await page.locator("#username").inputValue());// inputValue() is used to get the value of an input field, which is the text that the user has entered or that has been programmatically set. It retrieves the current value of the input element, allowing you to access what is displayed in the input box.
    await page.pause();
});
