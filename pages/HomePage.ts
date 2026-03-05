import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';


export class HomePage extends BasePage {
    readonly signButton: Locator;
    readonly userNameLabel: Locator;
    readonly accessoriesButton: Locator;

    constructor (page: Page) {
        super(page);
        this.signButton = page.locator('#_desktop_user_info > div > a');
        this.userNameLabel = page.locator('.account .hidden-sm-down');
        this.accessoriesButton = page.locator('#category-6 > a');
    }

    async goToSignIn() {
        await this.signButton.click();
    }

    async goToAccessories() {
        await this.accessoriesButton.click();
    }

    async getUserName(): Promise<string> {
        return this.getText(this.userNameLabel);
    }

    async expectUserName(firstName: string, lastName: string) {
        const name = (await this.userNameLabel.innerText()).trim();
        if (name !== `${firstName} ${lastName}`) {
            throw new Error(`expected user name to be ${firstName} ${lastName} but got ${name}`);
        }
    }
}