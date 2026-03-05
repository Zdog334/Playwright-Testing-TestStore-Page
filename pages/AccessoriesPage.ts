import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';

export class AccessoriesPage extends BasePage {
    readonly item: Locator;

    constructor (page: Page){
        super(page);
        this.item = page.locator('#js-product-list > div.products.row > div:nth-child(1) > article');
    }
    async selectItem(){
        await this.item.click();
    }
}