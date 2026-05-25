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
		this.playwrightTab = page.getByTestId('tab-playwright');
		this.testcafeTab = page.getByTestId('tab-testcafe');
		this.cypressTab = page.getByTestId('tab-cypress');
		this.fileBrowserPanel = page.getByTestId('file-browser');
		// file item testids follow the pattern "file-{filename}" (always contain a dot)
		this.fileItems = page.locator('[data-testid^="file-"][data-testid*="."]');
		this.codePanel = page.getByTestId('code-panel');
		this.codeContent = page.getByTestId('syntax-highlighter');
		this.githubLink = page.getByTestId('github-repo-link');
		this.stackBlitzLink = page.getByTestId('stackblitz-section').getByRole('link');
		this.backToHomeLink = page.getByTestId('back-link');
	}
}

export default ProjectsPage;
