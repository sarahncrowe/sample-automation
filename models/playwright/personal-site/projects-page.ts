import { type Locator, type Page } from '@playwright/test';

class ProjectsPage {
	readonly page: Page;
	readonly heading: Locator;
	readonly description: Locator;
	readonly playwrightTab: Locator;
	readonly testcafeTab: Locator;
	readonly cypressTab: Locator;
	readonly fileBrowserPanel: Locator;
	readonly fileItems: Locator;
	readonly codePanel: Locator;
	readonly codeContent: Locator;
	readonly githubLink: Locator;
	readonly stackBlitzLink: Locator;
	readonly backToHomeLink: Locator;

	constructor(page: Page) {
		this.page = page;
		this.heading = page.getByRole('heading', { level: 1 });
		this.description = page.locator('p').first();
		this.playwrightTab = page.locator('#fw-tab-playwright');
		this.testcafeTab = page.locator('#fw-tab-testcafe');
		this.cypressTab = page.locator('#fw-tab-cypress');
		this.fileBrowserPanel = page.locator('#file-browser-panel');
		this.fileItems = page.locator('[id^="file-tab-"]');
		this.codePanel = page.locator('#code-panel');
		this.codeContent = page.locator('#code-panel pre, #code-panel code').first();
		// data-testid targets the repo link specifically; avoids matching the CI badge link
		this.githubLink = page.getByTestId('github-repo-link');
		this.stackBlitzLink = page.locator('a[href*="stackblitz.com"]');
		this.backToHomeLink = page.getByRole('link', { name: 'Back to home' });
	}
}

export default ProjectsPage;
