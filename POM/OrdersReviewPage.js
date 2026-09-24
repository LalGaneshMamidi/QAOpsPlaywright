const { expect } = require("playwright/test");

class OrdersReviewPage{
    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropDown = page.locator(".ta-results.list-group.ng-star-inserted");
        this.emailId = page.locator('.user__name.mt-5 label[type="text"]');
        this.submitBtn = page.locator('.btnn.action__submit.ng-star-inserted');
        this.orderConfirmationText = page.locator('.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
    }
    async searchCountryAndSelect(countryCode,countryName) {
        await this.country.pressSequentially(countryCode);
        await this.dropDown.waitFor();
        const optionsCount = await this.dropDown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            const text = await this.dropDown.locator("button").nth(i).textContent();
            if (text === countryName) {
                await this.dropDown.locator("button").nth(i).click();
                break;
            }
        }

    }
    async verifyEmailId(userName){
        await expect(this.emailId).toHaveText(userName);
    }
    async submitAndGetOrderId(){
        await this.submitBtn.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
        
    }
}

module.exports = {OrdersReviewPage};