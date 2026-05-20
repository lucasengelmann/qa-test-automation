import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/world';

setDefaultTimeout(30 * 1000);

// ============================================
// GIVEN Steps
// ============================================

Given('I am on the SauceDemo login page', async function (this: ICustomWorld) {
    await this.loginPage.goto();
});

// ============================================
// WHEN Steps
// ============================================

When('I enter username {string} and password {string}', async function (
    this: ICustomWorld,
    username: string,
    password: string
) {
    await this.loginPage.login(username, password);
});

When('I click on the login button', async function (this: ICustomWorld) {
    // O clique já acontece dentro de loginPage.login()
    // Este step existe para compatibilidade com features que separam o clique
    await this.page.locator('[data-test="login-button"]').click();
});

// ============================================
// THEN Steps
// ============================================

Then('I should be redirected to the inventory page', async function (this: ICustomWorld) {
    await this.page.waitForURL('**/inventory.html', { timeout: 10000 });
    expect(this.page.url()).toContain('inventory.html');
});

Then('the page title should be {string}', async function (
    this: ICustomWorld,
    expectedTitle: string
) {
    await this.page.waitForSelector('[data-test="title"]', { timeout: 5000 });
    const title = await this.page.locator('[data-test="title"]').textContent();
    expect(title?.trim()).toBe(expectedTitle);
});

Then('I should see an error message containing {string}', async function (
    this: ICustomWorld,
    expectedMessage: string
) {
    const actualMessage = await this.loginPage.getErrorMessage();
    expect(actualMessage.toLowerCase()).toContain(expectedMessage.toLowerCase());
});