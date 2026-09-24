Feature: ECommerce Validation
    @Regression
    Scenario: placing the order
        Given a log in to ecommerce application with "lalganeshmamidi123@gmail.com" and "Jesus@143"
        When Add "iphone 13 pro" to the Cart
        Then Verify "iphone 13 pro" is displayed in the Cart
        When Enter valid details and place the order
        Then Verify order is present in the orders history page