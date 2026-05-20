# language: en
@cart
Feature: Cart - Shopping cart management
  As a logged in user
  I want to manage my shopping cart
  So that I can review items before checkout

  Background:
    Given I am logged in as a standard user

  @smoke
  Scenario: Cart page is accessible from inventory
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart
    Then I should be on the cart page
    And the cart should contain 1 item

  @regression
  Scenario: Cart shows correct items after adding
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    And I navigate to the cart
    Then the cart should contain 2 items

  @regression
  Scenario: Remove item from cart page
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart
    And I remove "sauce-labs-backpack" from the cart page
    Then the cart should contain 0 items

  @regression
  Scenario: Continue shopping from cart returns to inventory
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart
    And I click continue shopping
    Then I should see the inventory page

  @regression
  Scenario: Proceed to checkout from cart
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart
    And I click proceed to checkout
    Then I should be on the checkout step one page
