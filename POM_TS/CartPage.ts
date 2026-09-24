import {test, expect, Locator, Page} from '@playwright/test';
export class CartPage{
    page: Page;
    cartProducts: Locator;
    checkOutBtn: Locator;

    constructor(page:Page){
        this.page=page;
        this.cartProducts = page.locator("div li").first();
        this.checkOutBtn = page.locator("text=Checkout");
    }
    async checkOutProduct(){
        this.checkOutBtn.click();
    }
    async verifyProductIsDisplayed(productName: String){
        await this.cartProducts.waitFor();
        await expect(this.page.locator("h3:has-text('" +productName+ "')")).toBeVisible();
    }

}