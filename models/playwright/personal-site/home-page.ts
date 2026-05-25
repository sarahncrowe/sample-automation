import { type Locator, type Page } from '@playwright/test';

class HomePage {
	readonly page: Page;
	readonly nav: Locator;
	readonly navLinks: Locator;
	readonly heroSection: Locator;
	readonly aboutSection: Locator;
	readonly experienceSection: Locator;
	readonly skillsSection: Locator;
	readonly contactSection: Locator;
	readonly heroHeading: Locator;
	readonly aboutText: Locator;
	readonly images: Locator;
	readonly githubLink: Locator;
	readonly linkedinLink: Locator;
	readonly contactEmail: Locator;

	constructor(page: Page) {
		this.page = page;
		this.nav = page.getByRole('navigation');
		this.navLinks = this.nav.getByRole('link');
		this.heroSection = page.locator('#hero');
		this.aboutSection = page.locator('#about-detail');
		this.experienceSection = page.locator('#experience');
		this.skillsSection = page.locator('#skills');
		this.contactSection = page.locator('#contact');
		this.heroHeading = page.getByRole('heading', { level: 1 });
		this.aboutText = page.locator('#about-detail p').first();
		this.images = page.locator('img');
		this.githubLink = page.locator('a[href*="github.com"]');
		this.linkedinLink = page.locator('a[href*="linkedin.com"]');
		this.contactEmail = page.locator('a[href^="mailto:"]');
	}
}

export default HomePage;
