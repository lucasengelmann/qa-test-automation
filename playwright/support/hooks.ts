import { Before, After, AfterStep, Status } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { ICustomWorld } from './world';

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

    // Inicializa todas as Page Objects com a mesma instância de page
    this.loginPage = new (await import('../pages/LoginPage')).LoginPage(this.page);
    this.inventoryPage = new (await import('../pages/InventoryPage')).InventoryPage(this.page);
    this.cartPage = new (await import('../pages/CartPage')).CartPage(this.page);
});

// Captura screenshot automaticamente em caso de falha
AfterStep(async function (this: ICustomWorld, { result }) {
    if (result?.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({ fullPage: true });
        await this.attach(screenshot, 'image/png');
    }
});

After(async function (this: ICustomWorld, { result }) {
    // Captura screenshot final se o cenário falhou
    if (result?.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({ fullPage: true });
        await this.attach(screenshot, 'image/png');
    }

    await this.context?.close();
    await this.browser?.close();
});