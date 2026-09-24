const {After,Before, AfterStep, Status} = require('@cucumber/cucumber');

const playwright = require('playwright');
const { POManager } = require('../../POM/POManager');
const path = require('path');
Before(async function(){
    const browser = await playwright.chromium.launch({headless:false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After(function(){
    console.log("Iam the last to execute");
});

AfterStep(async function({result}){
    if(result.status===Status.FAILED){
        await this.page.screenshot({path:'cucumberScreenshot.png'});
    }
})