Feature: Ecommerce Error Validations
    @Validation
    Scenario Outline: Scenario Outline name: Checking whether error message is displayed after giving incorrect credentials
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verfiy error message is displayed

    Examples:
        | username                        | password    |
        |  lalganeshmamidi123@gmail.com   | Jesus@143   |
        |  Hello@123.com                  | Iamhello@12 |