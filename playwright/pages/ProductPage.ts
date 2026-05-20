import { Page, Locator } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;
    private readonly productName: Locator;
    private readonly productDescription: Locator;
    private readonly productPrice: Locator;
    private readonly addToCartButton: Locator;
    private readonly removeButton: Locator;
    private readonly backButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productDescription = page.locator('[data-test="inventory-item-desc"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
        this.removeButton = page.locator('[data-test^="remove"]');
        this.backButton = page.locator('[data-test="back-to-products"]');
    }

    async getName(): Promise<string> {
        return await this.productName.textContent() || '';
    }

    async getDescription(): Promise<string> {
        return await this.productDescription.textContent() || '';
    }

    async getPrice(): Promise<string> {
        return await this.productPrice.textContent() || '';
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    async removeFromCart(): Promise<void> {
        await this.removeButton.click();
    }

    async goBackToProducts(): Promise<void> {
        await this.backButton.click();
    }

    async isProductPage(): Promise<boolean> {
        return this.page.url().includes('inventory-item.html');
    }

    async isAddToCartVisible(): Promise<boolean> {
        return await this.addToCartButton.isVisible();
    }

    async isRemoveVisible(): Promise<boolean> {
        return await this.removeButton.isVisible();
    }
}