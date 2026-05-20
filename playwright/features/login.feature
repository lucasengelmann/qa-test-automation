Feature: SauceDemo Login Functionality
    As a registered user
    I want to log into the system
    So that I can access the product catalog

Background: 
    Given I am on the SauceDemo login page

@smoke @critical

Scenario: Successful login with valid credentials
    When I enter username "standard_user" and password "secret_sauce"
    Then I should be redirected to the inventory page
    And the page title should be "Products"

@regression
Scenario: Login with locked out user
    When I enter username "locked_out_user" and password "secret_sauce"
    And I click on the login button
    Then I should see an error message containing "locked out"

@regression
Scenario Outline: Login with invalid credentials
    When I enter username "<username>" and password "<password>"
    And I click on the login button
    Then I should see an error message containing "<errorMessage>"

    Examples:
      | username          | password     | errorMessage                          |
      | invalid_user      | wrong_pass   | Username and password do not match    |
      | standard_user     | wrong_pass   | Username and password do not match    |
      |                   | secret_sauce | Username is required                  |
      | standard_user     |              | Password is required                  |