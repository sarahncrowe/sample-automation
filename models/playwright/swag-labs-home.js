class SwagLabsHome {
	constructor(page) {
		this.page = page;

		this.logo = page.locator('.app-logo');
		this.productsHeader = page.locator('data-test=title');
	}
}

export default SwagLabsHome;
