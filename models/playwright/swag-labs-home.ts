import { type Locator, type Page } from '@playwright/test'

class SwagLabsHome {
	readonly page: Page
	readonly logo: Locator
	readonly productsHeader: Locator

	constructor(page) {
		this.page = page;

		this.logo = page.locator('.app-logo');
		this.productsHeader = page.locator('data-test=title');
	}
}

export default SwagLabsHome;
