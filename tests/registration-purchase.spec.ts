import { test, expect } from '../fixtures/baseTest';
import { credentials } from '../data/credentials';
import { Address } from '../data/types';

// combines simple registration smoke test and full purchase flow

test.describe('registration + purchase scenarios', () => {
  test('user can register and the account name is displayed', async ({
    home,
    login,
    registration
  }) => {
    const user = credentials.defaultUser;

    await home.navigate('');
    await home.goToSignIn();
    await login.goToRegister();
    await registration.register({
      gender: 'Mr',
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    });
    await home.expectUserName(user.firstName, user.lastName);
  });

  test('full purchase flow with address and payment', async ({
    home,
    login,
    registration,
    accessories,
    product,
    cart,
    checkout,
    page
  }) => {
    // generate a unique email for each run
    const timestamp = Date.now();
    const user = { ...credentials.defaultUser, email: `user${timestamp}@example.com` };

    // registration
    await home.navigate('');
    await home.goToSignIn();
    await login.goToRegister();
    await registration.register({
      gender: 'Mr',
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    });
    await home.expectUserName(user.firstName, user.lastName);

    // browsing and add to cart
    await home.goToAccessories();
    await accessories.selectItem();

    const unitPrice = await product.getUnitPrice();
    const quantity = 5;
    await product.setQuantity(quantity.toString());
    const expectedSubtotal = unitPrice * quantity;
    await product.addToCart();

    await cart.waitForModal();
    expect(await cart.getModalQuantity()).toBe('5');
    const modalSubtotalText = await cart.subtotal.innerText();
    const actualSubtotal = parseFloat(modalSubtotalText.replace('$', ''));
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);

    await cart.proceedToCheckout();
    await checkout.clickProceedToCheckout();
    // checkout steps (note: state field required after selecting country)
    const address: Address = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: '123 Main St',
      city: 'Virginia',
      postCode: '00000',
      country: 'United States',
      state: 'Virginia',
      phone: '02071234567'
    };

    await checkout.fillAddress(address);
    await checkout.continue(); // address -> shipping
    await checkout.continue(); // shipping -> payment
    await checkout.selectPayByCheck();
    await checkout.agreeToTerms();
    await checkout.placeOrder();

    await expect(checkout.orderConfirmationText).toBeVisible();
  });
});