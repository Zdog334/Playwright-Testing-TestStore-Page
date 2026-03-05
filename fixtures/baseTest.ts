import { test as baseTest, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { AccessoriesPage } from '../pages/AccessoriesPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// extend the built-in fixtures with our page objects
export const test = baseTest.extend<{
  home: HomePage;
  login: LoginPage;
  registration: RegistrationPage;
  accessories: AccessoriesPage;
  product: ProductPage;
  cart: CartPage;
  checkout: CheckoutPage;
}>({
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registration: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  accessories: async ({ page }, use) => {
    await use(new AccessoriesPage(page));
  },
  product: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  }
});

export { expect };

export type AppFixtures = typeof test;