import { Page, Locator } from '@playwright/test';

export class CartPage {
    private readonly page: Page;
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('[data-test="cart-item"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        // CORRIGIDO: pageTitle estava declarada mas nunca inicializada
        this.pageTitle = page.locator('[data-test="title"]');
    }

    async getTitle(): Promise<string> {
        return await this.pageTitle.textContent() || '';
    }

    async getCartItemsCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async removeItem(itemName: string): Promise<void> {
        const itemId = itemName.toLowerCase().replace(/\s+/g, '-');
        await this.page.locator(`[data-test="remove-${itemId}"]`).click();
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async isCartPage(): Promise<boolean> {
        return this.page.url().includes('cart.html');
    }
}