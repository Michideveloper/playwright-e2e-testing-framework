import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('SauceDemo E2E Purchase Flow', () => {
  test('should successfully purchase items and complete flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const firstProduct = 'Sauce Labs Backpack';
    const secondProduct = 'Sauce Labs Bolt T-Shirt';

    // 1. Navigate and Login
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Add Products to Cart
    await inventoryPage.addItemToCart(firstProduct);
    await inventoryPage.addItemToCart(secondProduct);
    await inventoryPage.navigateToCart();

    // 3. Verify Cart Items
    await cartPage.verifyItemInCart(firstProduct);
    await cartPage.verifyItemInCart(secondProduct);
    await cartPage.clickCheckout();

    // 4. Complete Checkout Information
    await checkoutPage.fillInformation('José', 'Gómez', '44100');

    // 5. Complete Purchase & Verify Success
    await checkoutPage.clickFinish();
    await checkoutPage.verifyPurchaseSuccessful();
  });
});
