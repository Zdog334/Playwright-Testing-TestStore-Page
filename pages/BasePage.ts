import {Page, Locator } from '@playwright/test'

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;

    }
    async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, text: string) {
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    // textContent can return null when the element is not present or has no text
    const text = await locator.textContent();
    return text ?? '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async selectOption(locator: Locator, value: string) {
    await locator.selectOption(value);
  }
}