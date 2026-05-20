import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    private readonly page: Page;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly cancelButton: Locator;
    private readonly pageTitle: Locator;
    private readonly summaryTotal: Locator;
    private readonly confirmationHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.pageTitle = page.locator('[data-test="title"]');
        this.summaryTotal = page.locator('[data-test="total-label"]');
        this.confirmationHeader = page.locator('[data-test="complete-header"]');
    }

    async getTitle(): Promise<string> {
        return await this.pageTitle.textContent() || '';
    }

    async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async clickFinish(): Promise<void> {
        await this.finishButton.click();
    }

    async clickCancel(): Promise<void> {
        await this.cancelButton.click();
    }

    async getOrderTotal(): Promise<string> {
        return await this.summaryTotal.textContent() || '';
    }

    async getConfirmationMessage(): Promise<string> {
        return await this.confirmationHeader.textContent() || '';
    }

    async isCheckoutStepOnePage(): Promise<boolean> {
        return this.page.url().includes('checkout-step-one.html');
    }

    async isCheckoutStepTwoPage(): Promise<boolean> {
        return this.page.url().includes('checkout-step-two.html');
    }

    async isCheckoutCompletePage(): Promise<boolean> {
        return this.page.url().includes('checkout-complete.html');
    }
}