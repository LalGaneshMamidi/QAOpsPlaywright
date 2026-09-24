import { test as baseTest} from '@playwright/test';
interface TestDataForOrder{
    userName: string;
    password: string;
    productName: string;
}
export const customTest = baseTest.extend<{testDataforOrder: TestDataForOrder}>
    (
        {
            testDataforOrder:
            {
                userName: "lalganeshmamidi123@gmail.com",
                password: "Jesus@143",
                productName: "ADIDAS ORIGINAL"
            }
        }
    )
