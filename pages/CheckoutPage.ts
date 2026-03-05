import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';
import { Address } from '../data/types';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly postCodeInput: Locator;
  readonly countrySelect: Locator;
  readonly stateSelect: Locator;
  readonly phoneInput: Locator;
  readonly proceedToCheckoutButton: Locator; // extra step before shipping
  readonly continueButtons: Locator;
  readonly termsCheckbox: Locator;
  readonly payByCheckOption: Locator;
  readonly placeOrderButton: Locator;
  readonly orderConfirmationText: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByLabel(/first name/i);
    this.lastNameInput = page.getByLabel(/last name/i);
    this.addressInput = page.locator('input[name="address1"]');
    this.cityInput = page.getByLabel(/city/i);
    this.postCodeInput = page.getByLabel(/postal code|zip/i);
    this.countrySelect = page.getByLabel(/country/i);
    this.stateSelect = page.getByLabel(/state/i);
    this.phoneInput = page.getByLabel(/phone/i);
    this.proceedToCheckoutButton = page.locator('a.btn-primary:has-text("Proceed to checkout")');
    this.continueButtons = page.getByRole('button', { name: /continue/i });
    this.termsCheckbox = page.getByLabel(/I agree to/i);
    this.payByCheckOption = page.locator('span.custom-radio').filter({ has: page.locator('#payment-option-2') });
    this.placeOrderButton = page.getByRole('button', { name: /place order/i });
    this.orderConfirmationText = page.getByText(/your order is confirmed/i);
  }

  async fillAddress(details: Address) {
    await this.fill(this.firstNameInput, details.firstName);
    await this.fill(this.lastNameInput, details.lastName);
    await this.fill(this.addressInput, details.address);
    await this.fill(this.cityInput, details.city);
    await this.fill(this.postCodeInput, details.postCode);
    if (details.country) {
      await this.selectOption(this.countrySelect, details.country);
    }
    if (details.state) {
      await this.selectOption(this.stateSelect, details.state);
    }
    if (details.phone) {
      await this.fill(this.phoneInput, details.phone);
    }
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async continue() {
    // there are multiple continue buttons during checkout; click the first one visible
    await this.continueButtons.first().click();
  }

  async agreeToTerms() {
    await this.termsCheckbox.check();
  }

  async selectPayByCheck() {
    await this.payByCheckOption.click();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async isOrderConfirmed(): Promise<boolean> {
    return this.orderConfirmationText.isVisible();
  }
}

