const {test,request, expect}=require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayLoad={userEmail: "lalganeshmamidi123@gmail.com", userPassword: "Jesus@143"};
const orderPayLoad={orders: [{country: "British Indian Ocean Territory", productOrderedId: "6960ea76c941646b7a8b3dd5"}]}

let response;
test.beforeAll(async({})=>{
    const apiContext = await request.newContext();
    const apiUtils =  new APIUtils(apiContext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})
test("@API place the order",async({page})=>{
    page.addInitScript((value)=>{
        window.localStorage.setItem('token',value)
    },response.token)
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const options=page.locator("tbody tr");
    const optionsCount= await options.count()
    for(let i=0; i<optionsCount; i++){
        if(response.orderId === await options.nth(i).locator("th").textContent()){
            await options.nth(i).getByRole("button",{name:"View"}).click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
})
