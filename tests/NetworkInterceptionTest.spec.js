const {test,request, expect}=require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const { json } = require('stream/consumers');
const loginPayLoad={userEmail: "lalganeshmamidi123@gmail.com", userPassword: "Jesus@143"};
const orderPayLoad={orders: [{country: "British Indian Ocean Territory", productOrderedId: "6960ea76c941646b7a8b3dd5"}]}
const fakePayloadOrders={data:[], message: "No Orders"};
let response;
test.beforeAll(async({})=>{
    const apiContext = await request.newContext();
    const apiUtils =  new APIUtils(apiContext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})
test("place the order",async({page})=>{
    //1. set up Authentication-->Before page loads, inject a token so the app thinks you’re logged in.
    page.addInitScript((value)=>{
        window.localStorage.setItem('token',value)
    },response.token)
    await page.goto("https://rahulshettyacademy.com/client/");
    //2. Intercept Network --> Whenever the app calls “get orders,” hijack the request and return fake data.
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>{
            //Intercepting the response -->API Response -->{Playwright Fake Response}Browser--> render data on front end
            const response= await page.request.fetch(route.request());
            let body= JSON.stringify(fakePayloadOrders);
            route.fulfill(
                {
                    response,
                    body,
                }
            )
        }
    )
    // Click into “My Orders,” wait for the mocked API to respond, then check what the UI shows.
    await page.locator("[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
})
