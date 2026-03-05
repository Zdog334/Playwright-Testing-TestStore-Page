import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

export class CartPage extends BasePage {
  readonly modal: Locator;
  readonly qtySpan: Locator;
  readonly subtotal: Locator;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.modal = page.locator('.modal-dialog').filter({
      hasText: 'Product successfully added to your shopping cart',
    });
    this.qtySpan = this.modal.locator('.product-quantity strong');
    this.subtotal = this.modal.locator('.subtotal.value');
    this.proceedButton = this.modal.locator('a.btn.btn-primary', {
      hasText: /Proceed to checkout/i,
    });
  }

  async waitForModal() {
    await expect(this.modal).toBeVisible();
  }

  async getModalQuantity(): Promise<string> {
    return (await this.qtySpan.textContent())?.trim() ?? '';
  }

  async getModalSubtotal(): Promise<string> {
    return (await this.subtotal.textContent())?.trim() ?? '';
  }

  async proceedToCheckout() {
    await this.proceedButton.click();
  }
}
