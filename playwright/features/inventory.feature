# language: en
@inventory
Feature: Inventory - Product listing
  As a logged in user
  I want to browse the product catalog
  So that I can find and add items to my cart

  Background:
    Given I am logged in as a standard user

  @smoke
  Scenario: Inventory page displays products
    Then I should see the inventory page
    And the page should display 6 products

  @regression
  Scenario: Add a single product to cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show 1 item

  @regression
  Scenario: Add multiple products to cart
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show 2 items

  @regression
  Scenario: Remove a product from cart on inventory page
    When I add "Sauce Labs Backpack" to the cart
    And I remove "Sauce Labs Backpack" from the cart
    Then the cart badge should not be visible

  @regression
  Scenario: Sort products by price low to high
    When I sort products by "lohi"
    Then the first product price should be lower than the last

  @regression
  Scenario: Sort products by name Z to A
    When I sort products by "za"
    Then the products should be sorted in descending order
