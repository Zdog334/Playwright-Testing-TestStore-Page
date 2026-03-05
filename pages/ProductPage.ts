import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';

export class ProductPage extends BasePage {
    readonly quantityInput: Locator;
    readonly addCartButton: Locator;
    readonly priceLabel: Locator;
    

    constructor(page: Page) {
        super(page);
        this.quantityInput = page.locator('#quantity_wanted');
        // the "Add to cart" control can be a button with name Submit or the
        // .add-to-cart link; we target a generic selector that works on this
        // PrestaShop theme.
        this.addCartButton = page.locator('button[name="Submit"], .add-to-cart');
        // price element shown on the product page
        this.priceLabel = page.locator('.current-price-value');
    }

    /**
     * Set a desired quantity (string or number is accepted).
     */
    async setQuantity(amount: string) {
        await this.quantityInput.fill(amount.toString());
    }

    async addToCart() {
        await this.addCartButton.click();
    }

    /**
     * Reads the unit price of the product as shown on the page.
     */
    async getUnitPrice(): Promise<number> {
        const priceAttr = await this.priceLabel.getAttribute('content');
        return parseFloat(priceAttr || '0');
    }
}