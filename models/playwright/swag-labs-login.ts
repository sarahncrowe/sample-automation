import { type Page, type Locator } from '@playwright/test'

class SwagLabsLogin {
	readonly page: Page
	readonly username: Locator
	readonly password: Locator
	readonly login: Locator

	constructor(page) {
		this.page = page;

		this.username = page.locator('#user-name');
		this.password = page.locator('#password');

		this.login = page.getByRole('button', { hasText: 'Login' });
	}
}

export default SwagLabsLogin;
