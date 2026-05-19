import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { chromium, Browser, Page } from '@playwright/test';

setDefaultTimeout(30 * 1000);

let browser: Browser;
let page: Page;

// ============================================
// GIVEN Steps
// ============================================

Given('I am on the SauceDemo login page', async function () {
  console.log('🚀 Launching browser...');
  browser = await chromium.launch({ 
    headless: false,
    slowMo: 50
  });
  page = await browser.newPage();
  console.log('📍 Navigating to SauceDemo...');
  await page.goto('https://www.saucedemo.com/', { timeout: 10000 });
  console.log('✅ Login page loaded');
});

// ============================================
// WHEN Steps
// ============================================

When('I enter username {string} and password {string}', async function (username: string, password: string) {
  console.log(`📝 Entering username: "${username || 'empty'}"`);
  await page.locator('[data-test="username"]').fill(username);
  
  console.log(`🔐 Entering password: ${password ? '***hidden***' : 'empty'}`);
  await page.locator('[data-test="password"]').fill(password);
});

When('I click on the login button', async function () {
  console.log('🖱️ Clicking login button...');
  await page.locator('[data-test="login-button"]').click();
  console.log('✅ Button clicked');
  await page.waitForTimeout(1000);
});

// ============================================
// THEN Steps
// ============================================

Then('I should be redirected to the inventory page', async function () {
  console.log('🔍 Verifying redirection...');
  await page.waitForURL('**/inventory.html', { timeout: 10000 });
  expect(page.url()).toContain('inventory.html');
  console.log('✅ Redirected to inventory page');
  // DON'T close browser here - let the next step do it
});

Then('the page title should be {string}', async function (expectedTitle: string) {
  console.log(`🔍 Verifying title: "${expectedTitle}"`);
  await page.waitForSelector('[data-test="title"]', { timeout: 5000 });
  const title = await page.locator('[data-test="title"]').textContent();
  expect(title?.trim()).toBe(expectedTitle);
  console.log(`✅ Title is "${title}"`);
  // Close browser after ALL verifications are done
  await browser.close();
});

Then('I should see an error message containing {string}', async function (expectedMessage: string) {
  console.log(`🔍 Looking for error message containing: "${expectedMessage}"`);
  
  const errorElement = page.locator('[data-test="error"]');
  await errorElement.waitFor({ state: 'visible', timeout: 5000 });
  
  const actualMessage = await errorElement.textContent();
  console.log(`Actual error: "${actualMessage}"`);
  
  expect(actualMessage?.toLowerCase()).toContain(expectedMessage.toLowerCase());
  console.log('✅ Error message verified');
  
  // Close browser after error verification
  await browser.close();
});
