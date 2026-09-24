class APIUtils{
    constructor(apiContext,loginPayLoad){
        this.apiContext=apiContext;
        this.loginPayLoad=loginPayLoad;
    }
    async getToken(){                                                                                                         
        //getting the token so that we can navigate tot he browser with logged in state
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayLoad,
        }
        )
        const loginResponseJson = await loginResponse.json();
        const token=loginResponseJson.token;
        console.log(token);
        return token;
    }
    async createOrder(orderPayLoad){
        //create the order using api
        let response={};
        response.token=await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data:orderPayLoad,
                headers:{
                    'Authorization':response.token,
                    'Content-Type':'application/json'
                }
            }
        )
        const orderResponseJson=await orderResponse.json();
            console.log(orderResponseJson);
            const orderId=orderResponseJson.orders[0];
            console.log(orderId);
            response.orderId=orderId;
            return response;
    }
}
module.exports={APIUtils};