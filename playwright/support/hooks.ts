import { Before, After, AfterStep, Status } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { ICustomWorld } from './world';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductPage } from '../pages/ProductPage';

const HEADLESS = process.env.HEADLESS !== 'false';

Before(async function (this: ICustomWorld) {
    this.browser = await chromium.launch({
        headless: HEADLESS,
        slowMo: HEADLESS ? 0 : 50,
    });

    this.context = await this.browser.newContext({
        viewport: { width: 1280, height: 720 },
        recordVideo: process.env.RECORD_VIDEO === 'true'
            ? { dir: 'reports/videos/' }
            : undefined,
    });

    this.page = await this.context.newPage();

    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.productPage = new ProductPage(this.page);
});

AfterStep(async function (this: ICustomWorld, { result }) {
    if (result?.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({ fullPage: true });
        await this.attach(screenshot, 'image/png');
    }
});

After(async function (this: ICustomWorld, { result }) {
    if (result?.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({ fullPage: true });
        await this.attach(screenshot, 'image/png');
    }

    await this.context?.close();
    await this.browser?.close();
});