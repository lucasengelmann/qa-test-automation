import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/world';

Then('I should see the inventory page', async function (this: ICustomWorld) {
    expect(await this.inventoryPage.isInventoryPage()).toBe(true);
    const title = await this.inventoryPage.getTitle();
    expect(title).toBe('Products');
});

Then('the page should display {int} products', async function (this: ICustomWorld, count: number) {
    const itemsCount = await this.inventoryPage.getItemsCount();
    expect(itemsCount).toBe(count);
});

When('I add {string} to the cart', async function (this: ICustomWorld, itemName: string) {
    await this.inventoryPage.addItemToCart(itemName);
});

When('I remove {string} from the cart', async function (this: ICustomWorld, itemName: string) {
    await this.inventoryPage.removeItemFromCart(itemName);
});

Then('the cart badge should show {int} item', async function (this: ICustomWorld, count: number) {
    const cartCount = await this.inventoryPage.getCartCount();
    expect(cartCount).toBe(count);
});

Then('the cart badge should show {int} items', async function (this: ICustomWorld, count: number) {
    const cartCount = await this.inventoryPage.getCartCount();
    expect(cartCount).toBe(count);
});

Then('the cart badge should not be visible', async function (this: ICustomWorld) {
    const count = await this.inventoryPage.getCartCount();
    expect(count).toBe(0);
});

When('I sort products by {string}', async function (this: ICustomWorld, option: string) {
    await this.inventoryPage.sortBy(option as 'az' | 'za' | 'lohi' | 'hilo');
});

Then('the first product price should be lower than the last', async function (this: ICustomWorld) {
    const prices = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
    const first = parseFloat(prices[0].replace('$', ''));
    const last = parseFloat(prices[prices.length - 1].replace('$', ''));
    expect(first).toBeLessThanOrEqual(last);
});

Then('the products should be sorted in descending order', async function (this: ICustomWorld) {
    const names = await this.page.locator('[data-test="inventory-item-name"]').allTextContents();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
});