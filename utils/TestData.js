const base = require('@playwright/test');

exports.customtest = base.test.extend
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
