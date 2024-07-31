class SwagLabsLogin {
	constructor() {
		this.page = page;

		this.username = page.locator('#user-name');
		this.password = page.locator('#password');

		this.login = page.getByRole('button', { hasText: 'Login' });
	}
}

export default SwagLabsLogin;
