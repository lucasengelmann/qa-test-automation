# language: en
@checkout
Feature: Checkout - Order completion flow
  As a logged in user
  I want to complete the checkout process
  So that I can purchase my selected items

  Background:
    Given I am logged in as a standard user
    And I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart
    And I click proceed to checkout

  @smoke
  Scenario: Complete checkout with valid information
    When I fill in shipping info with "John" "Doe" "12345"
    And I click continue on checkout
    Then I should be on the checkout overview page
    When I click finish
    Then I should see the order confirmation

  @regression
  Scenario: Checkout fails with empty first name
    When I fill in shipping info with "" "Doe" "12345"
    And I click continue on checkout
    Then I should see a checkout error containing "First Name is required"

  @regression
  Scenario: Checkout fails with empty last name
    When I fill in shipping info with "John" "" "12345"
    And I click continue on checkout
    Then I should see a checkout error containing "Last Name is required"

  @regression
  Scenario: Checkout fails with empty postal code
    When I fill in shipping info with "John" "Doe" ""
    And I click continue on checkout
    Then I should see a checkout error containing "Postal Code is required"

  @regression
  Scenario: Cancel checkout returns to cart
    When I click cancel on checkout
    Then I should be on the cart page

  @regression
  Scenario: Checkout overview shows correct item
    When I fill in shipping info with "John" "Doe" "12345"
    And I click continue on checkout
    Then the order summary should contain "Sauce Labs Backpack"
