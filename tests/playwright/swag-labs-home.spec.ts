import env from '../environmentConfig';
import SwagLabsLogin from '../../models/playwright/swag-labs-login';
import SwagLabsHome from '../../models/playwright/swag-labs-home';
const { test, expect } = require('@playwright/test');

const { url, standardUser } = env;

test.describe('Read Home Page', () => {
	test.beforeEach(async ({ page }) => {
		const login = new SwagLabsLogin(page);
		await page.goto(url);

		await login.username.fill(standardUser.username);
		await login.password.fill(standardUser.password);

		await login.login.click();
	});

	test('User can view items for sale', async ({ page }) => {
		const homepage = new SwagLabsHome(page);

		await expect(homepage.productsHeader).toBeVisible();
	});
});
