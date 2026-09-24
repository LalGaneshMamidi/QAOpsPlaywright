import {test, expect, Locator, Page} from '@playwright/test';
export class OrdersHistoryPage {
    page:Page;
    ordersTable: Locator
    rows: Locator;
    orderIdDetails: Locator
    constructor(page: Page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }
    async searchOrderAndSelect(orderId: any) {
        await this.rows.first().waitFor();
        const rowCount = await this.rows.count();
        for (let i = 0; i < rowCount; i++) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator(".btn.btn-primary").click();
                break;
            }
        }
    }
    async getOrderId(){
        await this.orderIdDetails.waitFor();
        return await this.orderIdDetails.textContent();
    }
}
