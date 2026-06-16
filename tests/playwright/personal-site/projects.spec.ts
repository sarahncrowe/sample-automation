import { test, expect } from '@playwright/test';
import ProjectsPage from '../../../models/playwright/personal-site/projects-page';

const PROJECT_NAME = 'sample-automation';

test.beforeEach(async ({ page }) => {
  await page.goto('/projects');
});

test.describe('Page Structure', () => {
  test('User can see the page title', async ({ page }) => {
    await expect(page).toHaveTitle(/sample work/i);
  });

  test('User can see the project name', async ({ page }) => {
    const projects = new ProjectsPage(page);
    await expect(projects.heading).toBeVisible();
    await expect(projects.heading).toHaveText(PROJECT_NAME);
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

test.describe('CI Run History', () => {
  test('User can see the CI run history section', async ({ page }) => {
    const projects = new ProjectsPage(page);
    await expect(projects.runHistorySection).toBeVisible();
  });

  test('User can see run history for each framework', async ({ page }) => {
    const projects = new ProjectsPage(page);
    await expect(projects.playwrightCiRow).toBeVisible();
    await expect(projects.testcafeCiRow).toBeVisible();
    await expect(projects.cypressCiRow).toBeVisible();
  });

  test('User can see run squares for each framework', async ({ page }) => {
    const projects = new ProjectsPage(page);
    const playwrightSquares = projects.playwrightCiRow.getByTestId('run-square');
    const testcafeSquares = projects.testcafeCiRow.getByTestId('run-square');
    const cypressSquares = projects.cypressCiRow.getByTestId('run-square');
    await expect(playwrightSquares.first()).toBeVisible();
    await expect(testcafeSquares.first()).toBeVisible();
    await expect(cypressSquares.first()).toBeVisible();
  });

  test('User can see a tooltip when hovering a run square', async ({ page }) => {
    const projects = new ProjectsPage(page);
    const firstSquare = projects.playwrightCiRow.getByTestId('run-square').first();
    const firstTooltip = projects.playwrightCiRow.getByTestId('run-square-tooltip').first();
    await firstSquare.hover();
    await expect(firstTooltip).toBeVisible();
  });

  test('Tooltip shows run status and number', async ({ page }) => {
    const projects = new ProjectsPage(page);
    const firstSquare = projects.playwrightCiRow.getByTestId('run-square').first();
    const firstTooltip = projects.playwrightCiRow.getByTestId('run-square-tooltip').first();
    await firstSquare.hover();
    await expect(firstTooltip).toBeVisible();
    await expect(firstTooltip).toHaveText(/^(Passed|Failed) – Run #\d+/);
  });

  test('Run squares link to GitHub Actions', async ({ page }) => {
    const projects = new ProjectsPage(page);
    const firstSquare = projects.playwrightCiRow.getByTestId('run-square').first();
    await expect(firstSquare).toHaveAttribute('href', /github\.com\/sarahncrowe\/sample-automation\/actions\/runs\//);
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
    await expect(page).toHaveURL('/');
  });
});
