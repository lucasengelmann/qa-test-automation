import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/world';

When('I navigate to the cart', async function (this: ICustomWorld) {
    await this.inventoryPage.goToCart();
});

Then('I should be on the cart page', async function (this: ICustomWorld) {
    await this.page.waitForURL('**/cart.html', { timeout: 5000 });
    expect(await this.cartPage.isCartPage()).toBe(true);
});

Then('the cart should contain {int} item', async function (this: ICustomWorld, count: number) {
    const itemsCount = await this.cartPage.getCartItemsCount();
    expect(itemsCount).toBe(count);
});

Then('the cart should contain {int} items', async function (this: ICustomWorld, count: number) {
    const itemsCount = await this.cartPage.getCartItemsCount();
    expect(itemsCount).toBe(count);
});

When('I remove {string} from the cart page', async function (this: ICustomWorld, itemId: string) {
    await this.cartPage.removeItem(itemId);
});

When('I click continue shopping', async function (this: ICustomWorld) {
    await this.cartPage.continueShopping();
});

When('I click proceed to checkout', async function (this: ICustomWorld) {
    await this.cartPage.proceedToCheckout();
});

Then('I should be on the checkout step one page', async function (this: ICustomWorld) {
    await this.page.waitForURL('**/checkout-step-one.html', { timeout: 5000 });
    expect(await this.checkoutPage.isCheckoutStepOnePage()).toBe(true);
});