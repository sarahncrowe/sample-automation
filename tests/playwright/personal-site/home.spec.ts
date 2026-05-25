import { test, expect } from '@playwright/test';
import env from '../../environmentConfig';
import HomePage from '../../../models/playwright/personal-site/home-page';

const { personalSite } = env;

test.beforeEach(async ({ page }) => {
	await page.goto(personalSite.url);
});

test.describe('Read Home Page', () => {
	test('User can see the page title', async ({ page }) => {
		await expect(page).toHaveTitle(/sarah\s*crowe/i);
	});

	test('User can see all major sections', async ({ page }) => {
		const home = new HomePage(page);
		await expect(home.heroSection).toBeVisible();
		await expect(home.aboutSection).toBeVisible();
		await expect(home.experienceSection).toBeVisible();
		await expect(home.skillsSection).toBeVisible();
		await expect(home.contactSection).toBeVisible();
	});
});

test.describe('Navigate Home Page', () => {
	test('User can see the navigation bar', async ({ page }) => {
		const home = new HomePage(page);
		await expect(home.nav).toBeVisible();
		await expect(home.navLinks.first()).toBeVisible();
	});

	test('User can navigate to page sections', async ({ page }) => {
		// "Projects" navigates to a separate page so it is excluded from the scroll test
		const navSections = [
			{ linkName: 'About', sectionLocator: '#about-detail' },
			{ linkName: 'Experience', sectionLocator: '#experience' },
			{ linkName: 'Skills', sectionLocator: '#skills' },
			{ linkName: 'Contact', sectionLocator: '#contact' }
		];

		for (const { linkName, sectionLocator } of navSections) {
			await page.getByRole('navigation').getByRole('link', { name: linkName }).click();
			await expect(page.locator(sectionLocator)).toBeInViewport();
		}
	});
});

test.describe('Read Home Page Content', () => {
	test('User can read the hero introduction', async ({ page }) => {
		const home = new HomePage(page);
		await expect(home.heroSection).toBeVisible();
		await expect(home.heroHeading).toBeVisible();
		await expect(home.heroHeading).not.toBeEmpty();
	});

	test('User can read the about section', async ({ page }) => {
		const home = new HomePage(page);
		await expect(home.aboutSection).toBeVisible();
		await expect(home.aboutText).toBeVisible();
		await expect(home.aboutText).not.toBeEmpty();
	});

	test('User can see all images', async ({ page }) => {
		const home = new HomePage(page);
		const images = await home.images.all();
		for (const img of images) {
			const naturalWidth = await img.evaluate((el) => (el as HTMLImageElement).naturalWidth);
			expect(naturalWidth).toBeGreaterThan(0);
		}
	});
});

test.describe('Read Home Page Links', () => {
	test('User can navigate to GitHub profile', async ({ page }) => {
		const home = new HomePage(page);
		await expect(home.githubLink.first()).toHaveAttribute('href', /github\.com\/sarahncrowe/i);
	});

	test('User can navigate to LinkedIn profile', async ({ page }) => {
		const home = new HomePage(page);
		// Update the regex to match your full LinkedIn profile URL if needed
		await expect(home.linkedinLink.first()).toHaveAttribute('href', /linkedin\.com\/in\//i);
	});

	test('User can find contact information', async ({ page }) => {
		const home = new HomePage(page);
		const hasEmail = (await home.contactEmail.count()) > 0;
		const hasForm = (await page.locator('#contact form, form').count()) > 0;
		expect(hasEmail || hasForm).toBe(true);
	});

	test('User can open external links in a new tab', async ({ page }) => {
		const externalLinks = await page
			.locator('a[href^="http"]:not([href*="sarahncrowe.com"])')
			.all();
		expect(externalLinks.length).toBeGreaterThan(0);
		for (const link of externalLinks) {
			const target = await link.getAttribute('target');
			expect(target).toBe('_blank');
		}
	});
});
