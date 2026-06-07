import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async verifyItemInCart(productName: string): Promise<void> {
    const itemLocator = this.page.locator('.cart_item', { hasText: productName });
    await expect(itemLocator).toBeVisible();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
