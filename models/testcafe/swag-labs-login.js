import { Selector } from 'testcafe';

class SwagLabsLogin {
	constructor() {
		this.username = Selector('#user-name');
		this.password = Selector('#password');

		this.login = Selector('#login-button');
	}
}

export const swagLabsLogin = new SwagLabsLogin();
