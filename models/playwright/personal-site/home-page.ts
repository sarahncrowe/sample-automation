import { type Locator, type Page } from '@playwright/test';

class HomePage {
  readonly page: Page;
  readonly nav: Locator;
  readonly navBrand: Locator;
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
    this.nav = page.getByTestId('navbar');
    this.navBrand = page.getByTestId('nav-brand');
    this.navLinks = page.getByTestId('nav-links').getByRole('link');
    this.heroSection = page.getByTestId('hero-section');
    this.aboutSection = page.getByTestId('about-section');
    this.experienceSection = page.getByTestId('experience-section');
    this.skillsSection = page.getByTestId('skills-section');
    this.contactSection = page.getByTestId('contact-section');
    this.heroHeading = page.getByTestId('hero-name');
    this.aboutText = page.getByTestId('about-bio');
    this.images = page.locator('img');
    this.githubLink = page.getByTestId('contact-github');
    this.linkedinLink = page.getByTestId('contact-linkedin');
    this.contactEmail = page.getByTestId('contact-email');
  }
}

export default HomePage;
