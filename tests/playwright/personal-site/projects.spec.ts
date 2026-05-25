import { test, expect } from '@playwright/test';
import env from '../../environmentConfig';
import ProjectsPage from '../../../models/playwright/personal-site/projects-page';

const { personalSite } = env;

test.beforeEach(async ({ page }) => {
  await page.goto(`${personalSite.url}/projects`);
});

test.describe('Page Structure', () => {
  test('User can see the page title', async ({ page }) => {
    await expect(page).toHaveTitle(/projects/i);
  });

  test('User can see the project name', async ({ page }) => {
    const projects = new ProjectsPage(page);
    await expect(projects.heading).toBeVisible();
    await expect(projects.heading).toHaveText('sample-automation');
  });

  test('User can read the project description', async ({ page }) => {
    const projects = new ProjectsPage(page);
    await expect(projects.description).toBeVisible();
    await expect(projects.description).not.toBeEmpty();
  });
});

test.describe('Framework Tabs', () => {
  test('User can see all framework tabs', async ({ page }) => {
    const projects = new ProjectsPage(page);
    await expect(projects.playwrightTab).toBeVisible();
    await expect(projects.testcafeTab).toBeVisible();
    await expect(projects.cypressTab).toBeVisible();
  });

  test('User can filter files by framework', async ({ page }) => {
    const projects = new ProjectsPage(page);
    await expect(projects.fileItems.first()).toBeVisible({ timeout: 15000 });
    await projects.testcafeTab.click();
    await expect(projects.fileBrowserPanel).toBeVisible();
    await expect(projects.fileItems.first()).toBeVisible();
  });
});

test.describe('File Browser', () => {
  test('User can see the file browser', async ({ page }) => {
    const projects = new ProjectsPage(page);
    await expect(projects.fileBrowserPanel).toBeVisible();
  });

  test('User can see files on load', async ({ page }) => {
    const projects = new ProjectsPage(page);
    await expect(projects.fileItems.first()).toBeVisible({ timeout: 15000 });
    const count = await projects.fileItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('User can view file code', async ({ page }) => {
    const projects = new ProjectsPage(page);
    await expect(projects.fileItems.first()).toBeVisible({ timeout: 15000 });
    await projects.fileItems.first().click();
    await expect(projects.codeContent).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Links', () => {
  test('User can navigate to the GitHub repository', async ({ page }) => {
    const projects = new ProjectsPage(page);
    await expect(projects.githubLink).toHaveAttribute('href', /github\.com\/sarahncrowe\/sample-automation/);
  });

  test('User can open the project in StackBlitz', async ({ page }) => {
    const projects = new ProjectsPage(page);
    await expect(projects.stackBlitzLink).toBeVisible();
  });

  test('User can navigate back to the home page', async ({ page }) => {
    const projects = new ProjectsPage(page);
    await projects.backToHomeLink.click();
    await expect(page).toHaveURL(personalSite.url + '/');
  });
});
