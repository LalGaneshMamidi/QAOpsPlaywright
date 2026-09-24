import {test, expect, Locator, Page} from '@playwright/test';
export class OrdersReviewPage{
    page:Page;
    country: Locator;
    dropDown: Locator;
    emailId: Locator;
    submitBtn: Locator;
    orderConfirmationText:Locator;
    orderId: Locator;
    constructor(page:Page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropDown = page.locator(".ta-results.list-group.ng-star-inserted");
        this.emailId = page.locator('.user__name.mt-5 label[type="text"]');
        this.submitBtn = page.locator('.btnn.action__submit.ng-star-inserted');
        this.orderConfirmationText = page.locator('.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
    }
    async searchCountryAndSelect(countryCode: string,countryName: string) {
        await this.country.pressSequentially(countryCode);
        await this.dropDown.waitFor();
        const optionsCount = await this.dropDown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            let text: any;
            text = await this.dropDown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await this.dropDown.locator("button").nth(i).click();
                break;
            }
        }

    }
    async verifyEmailId(userName:string){
        await expect(this.emailId).toHaveText(userName);
    }
    async submitAndGetOrderId(){
        await this.submitBtn.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
        
    }
}