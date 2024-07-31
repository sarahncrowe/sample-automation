import { Selector } from 'testcafe';

class SwagLabsHome {
	constructor() {
		this.logo = Selector('#header_logo > a > img');

		this.logo = Selector('.app-logo');
		this.productsHeader = Selector('.title');
	}
}

export const swagLabsHome = new SwagLabsHome();
