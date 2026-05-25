import { test, expect } from '@playwright/test';
import env from '../../environmentConfig';
import ProjectsPage from '../../../models/playwright/personal-site/projects-page';

const { personalSite } = env;

test.beforeEach(async ({ page }) => {
	await page.goto(`${personalSite.url}/projects`);
});

test.describe('Page Structure', () => {
	test('has correct page title', async ({ page }) => {
		await expect(page).toHaveTitle(/projects/i);
	});

	test('project name heading is visible', async ({ page }) => {
		const projects = new ProjectsPage(page);
		await expect(projects.heading).toBeVisible();
		await expect(projects.heading).toHaveText('sample-automation');
	});

	test('project description is visible', async ({ page }) => {
		const projects = new ProjectsPage(page);
		await expect(projects.description).toBeVisible();
		await expect(projects.description).not.toBeEmpty();
	});
});

test.describe('Framework Tabs', () => {
	test('all framework tabs are visible', async ({ page }) => {
		const projects = new ProjectsPage(page);
		await expect(projects.playwrightTab).toBeVisible();
		await expect(projects.testcafeTab).toBeVisible();
		await expect(projects.cypressTab).toBeVisible();
	});

	test('clicking a framework tab updates the file list', async ({ page }) => {
		const projects = new ProjectsPage(page);
		await expect(projects.fileItems.first()).toBeVisible({ timeout: 15000 });
		await projects.testcafeTab.click();
		await expect(projects.fileBrowserPanel).toBeVisible();
		await expect(projects.fileItems.first()).toBeVisible();
	});
});

test.describe('File Browser', () => {
	test('file browser panel is visible', async ({ page }) => {
		const projects = new ProjectsPage(page);
		await expect(projects.fileBrowserPanel).toBeVisible();
	});

	test('file list contains at least one file on load', async ({ page }) => {
		const projects = new ProjectsPage(page);
		await expect(projects.fileItems.first()).toBeVisible({ timeout: 15000 });
		const count = await projects.fileItems.count();
		expect(count).toBeGreaterThan(0);
	});

	test('clicking a file loads code in the code panel', async ({ page }) => {
		const projects = new ProjectsPage(page);
		await expect(projects.fileItems.first()).toBeVisible({ timeout: 15000 });
		await projects.fileItems.first().click();
		await expect(projects.codeContent).toBeVisible({ timeout: 10000 });
	});
});

test.describe('Links', () => {
	test('View on GitHub link points to correct repo', async ({ page }) => {
		const projects = new ProjectsPage(page);
		await expect(projects.githubLink).toHaveAttribute(
			'href',
			/github\.com\/sarahncrowe\/sample-automation/
		);
	});

	test('Open in StackBlitz link is present', async ({ page }) => {
		const projects = new ProjectsPage(page);
		await expect(projects.stackBlitzLink).toBeVisible();
	});

	test('Back to home link navigates to homepage', async ({ page }) => {
		const projects = new ProjectsPage(page);
		await projects.backToHomeLink.click();
		await expect(page).toHaveURL(personalSite.url + '/');
	});
});
