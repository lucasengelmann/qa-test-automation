import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    private readonly page: Page;
    private readonly inventoryItems: Locator;
    private readonly cartBadge: Locator;
    private readonly cartIcon: Locator;
    private readonly pageTitle: Locator;
    private readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.pageTitle = page.locator('[data-test="title"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }

    async getTitle(): Promise<string> {
        return await this.pageTitle.textContent() || '';
    }

    async getItemsCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    async addItemToCart(itemName: string): Promise<void> {
        const itemId = itemName.toLowerCase().replace(/\s+/g, '-');
        await this.page.locator(`[data-test="add-to-cart-${itemId}"]`).click();
    }

    async addItemByIndex(index: number): Promise<void> {
        await this.page.locator('[data-test^="add-to-cart-"]').nth(index).click();
    }

    async removeItemFromCart(itemName: string): Promise<void> {
        const itemId = itemName.toLowerCase().replace(/\s+/g, '-');
        await this.page.locator(`[data-test="remove-${itemId}"]`).click();
    }

    async goToCart(): Promise<void> {
        await this.cartIcon.click();
    }

    async getCartCount(): Promise<number> {
        const isVisible = await this.cartBadge.isVisible();
        if (!isVisible) return 0;
        const count = await this.cartBadge.textContent();
        return count ? parseInt(count) : 0;
    }

    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.sortDropdown.selectOption(option);
    }

    async isInventoryPage(): Promise<boolean> {
        return this.page.url().includes('inventory.html');
    }
}