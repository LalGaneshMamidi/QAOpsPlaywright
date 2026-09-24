const {LoginPage} = require('../POM/LoginPage');
const {DashboardPage} = require('../POM/DashboardPage');
const {CartPage} = require('../POM/CartPage');
const {OrdersReviewPage} = require('../POM/OrdersReviewPage');
const {OrdersHistoryPage } = require('./OrdersHistoryPage');
class POManager{
    constructor(page){
        this.page=page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersReviewPage = new OrdersReviewPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(page); 
    }
    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboardPage;
    }
    getCartPage(){
        return this.cartPage;
    }
    getOrdersReveiwPage(){
        return this.ordersReviewPage;
    }
    getOrdersHistoryPage(){
        return this.ordersHistoryPage;
    }
}
module.exports = {POManager};