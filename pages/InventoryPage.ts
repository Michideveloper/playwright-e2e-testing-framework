import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addItemToCart(productName: string): Promise<void> {
    const productLocator = this.page.locator('.inventory_item', { hasText: productName });
    const addToCartButton = productLocator.locator('button');
    await addToCartButton.click();
  }

  async navigateToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
