///////////////////////
//      Set Up       //
///////////////////////

import { ClientFunction, Role } from 'testcafe';
import baseConfig from '../environmentConfig';
import { swagLabsLogin } from '../../models/testcafe/swag-labs-login';
import { swagLabsHome } from '../../models/testcafe/swag-labs-home';

const standardUser = baseConfig.standardUser;
const url = baseConfig.url;

const getLocation = ClientFunction(() => document.location.href);
const user = Role(
	url,
	async t => {
		await t
			.typeText(swagLabsLogin.username, standardUser.username)
			.typeText(swagLabsLogin.password, standardUser.password)
			.click(swagLabsLogin.login);
	},
	{ preserveUrl: true }
);

fixture`TestCafe Sample Automation - Homepage`.page(url).beforeEach(async t => {
	await t.useRole(user);
});

//

test('home page is displayed', async t => {
	await t.expect(getLocation()).contains('https://www.saucedemo.com/inventory.html');

	await t.expect(swagLabsHome.productsHeader.visible).ok();
});
