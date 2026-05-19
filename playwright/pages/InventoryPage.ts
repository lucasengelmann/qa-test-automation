import { Page, Locator } from '@playwright/test'

export class InventoryPage {
    private readonly page: Page;
    private readonly inventoryItems: Locator;
    private readonly cartBadge: Locator;
    private readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.pageTitle = page.locator('.title');
    }

    async getTitle(): Promise <string> {
        return await this.pageTitle.textContent() || '';
    }

    async addItemToCart(itemName: string): Promise<void> {
        const itemId = itemName.toLowerCase().replace(/\s/g, '-');
        const buttonSelector = `[data-test="add-to-cart-${itemId}"]`;
        await this.page.locator(buttonSelector).first().click();
  } 

   async addItemByIndex(index: number): Promise<void> {
    await this.page.locator(`[data-test^="add-to-cart-"]`).nth(index).click();
  }

    async goToCart(): Promise<void> {
    await this.cartBadge.click();
  }

  async getCartCount(): Promise<number> {
    const count = await this.cartBadge.textContent();
    return count ? parseInt(count) : 0;
  }

   async isInventoryPage(): Promise<boolean> {
    return await this.page.url().includes('inventory.html');
  }
}