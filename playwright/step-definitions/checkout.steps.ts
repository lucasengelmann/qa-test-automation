import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/world';

When('I fill in shipping info with {string} {string} {string}', async function (
    this: ICustomWorld,
    firstName: string,
    lastName: string,
    postalCode: string
) {
    await this.checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
});

When('I click continue on checkout', async function (this: ICustomWorld) {
    await this.checkoutPage.clickContinue();
});

When('I click finish', async function (this: ICustomWorld) {
    await this.checkoutPage.clickFinish();
});

When('I click cancel on checkout', async function (this: ICustomWorld) {
    await this.checkoutPage.clickCancel();
});

Then('I should be on the checkout overview page', async function (this: ICustomWorld) {
    await this.page.waitForURL('**/checkout-step-two.html', { timeout: 5000 });
    expect(await this.checkoutPage.isCheckoutStepTwoPage()).toBe(true);
});

Then('I should see the order confirmation', async function (this: ICustomWorld) {
    await this.page.waitForURL('**/checkout-complete.html', { timeout: 5000 });
    const message = await this.checkoutPage.getConfirmationMessage();
    expect(message).toContain('Thank you for your order');
});

Then('I should see a checkout error containing {string}', async function (
    this: ICustomWorld,
    expectedError: string
) {
    const error = await this.page.locator('[data-test="error"]').textContent();
    expect(error).toContain(expectedError);
});

Then('the order summary should contain {string}', async function (
    this: ICustomWorld,
    itemName: string
) {
    const summaryItems = await this.page.locator('[data-test="inventory-item-name"]').allTextContents();
    expect(summaryItems).toContain(itemName);
});