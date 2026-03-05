import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';

export class LoginPage extends BasePage {
    readonly registerButton: Locator;

    constructor (page: Page){
        super(page);
        this.registerButton = page.getByRole('link', {name: 'No account?'})
    }


    async goToRegister() {
        await this.registerButton.click();
    }
}