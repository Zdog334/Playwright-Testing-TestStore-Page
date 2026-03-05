import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
    readonly genderMrRadio: Locator;
    readonly genderMrsRadio: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly termsCheckbox: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        super(page);
        this.genderMrRadio = page.getByRole('radio', { name: 'Mr.' });
        this.genderMrsRadio = page.getByRole('radio', { name: 'Mrs.' });
        this.firstNameInput = page.getByLabel(/first name/i);
        this.lastNameInput = page.getByLabel(/last name/i);
        this.emailInput = page.getByLabel(/email/i);
        this.passwordInput = page.getByLabel(/password/i);
        this.termsCheckbox = page.getByLabel(/I agree to the terms and conditions and the privacy policy/i);
        this.registerButton = page.getByRole('button', { name: /save/i });
    }

    async selectGender(gender: 'Mr' | 'Mrs') {
        if (gender === 'Mr') {
            await this.genderMrRadio.check();
        } else {
            await this.genderMrsRadio.check();
        }
    }

    async fillFirstName(name: string) {
        await this.fill(this.firstNameInput, name);
    }

    async fillLastName(name: string) {
        await this.fill(this.lastNameInput, name);
    }

    async fillEmail(email: string) {
        await this.fill(this.emailInput, email);
    }

    async fillPassword(password: string) {
        await this.fill(this.passwordInput, password);
    }

    async agreeToTerms() {
        // sometimes the checkbox needs to be forced in case it's hidden behind
        // text; using .check() will click the associated label which is more
        // robust.
        await this.termsCheckbox.check();
    }

    async submit() {
        await this.registerButton.click();
    }

    async register(details: {
        gender: 'Mr' | 'Mrs';
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        await this.selectGender(details.gender);
        await this.fillFirstName(details.firstName);
        await this.fillLastName(details.lastName);
        await this.fillEmail(details.email);
        await this.fillPassword(details.password);
        await this.agreeToTerms();
        await this.submit();
    }
}
