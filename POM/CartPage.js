const {expect} = require('@playwright/test');
class CartPage{
    constructor(page){
        this.page=page;
        this.cartProducts = page.locator("div li").first();
        this.checkOutBtn = page.locator("text=Checkout");
    }
    async checkOutProduct(){
        this.checkOutBtn.click();
    }
    async verifyProductIsDisplayed(productName){
        await this.cartProducts.waitFor();
        await expect(this.page.locator("h3:has-text('" +productName+ "')")).toBeVisible();
    }

}
module.exports = {CartPage};