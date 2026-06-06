import { test, expect } from '@playwright/test';
import HomePage from '../../../models/playwright/personal-site/home-page';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Page Structure', () => {
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

test.describe('Navigation', () => {
  test('User can see the navigation bar', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.nav).toBeVisible();
    await expect(home.navBrand).toBeVisible();
    await expect(home.navLinks.first()).toBeVisible();
  });

  test('User can navigate to page sections', async ({ page }) => {
    // "Sample Work" navigates to a separate page so it is excluded from the scroll test
    const navSections = [
      { linkName: 'About', sectionLocator: '#about-detail' },
      { linkName: 'Experience', sectionLocator: '#experience' },
      { linkName: 'Skills', sectionLocator: '#skills' },
      { linkName: 'Contact', sectionLocator: '#contact' },
    ];

    for (const { linkName, sectionLocator } of navSections) {
      await page.getByRole('navigation').getByRole('link', { name: linkName }).click();
      await expect(page.locator(sectionLocator)).toBeInViewport();
    }
  });
});

test.describe('Content', () => {
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
      const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });
});

test.describe('Experience', () => {
  test('Experience card grid is visible with all cards', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.experienceList).toBeVisible();
    const cards = await home.experienceCards.all();
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      await expect(card).toBeVisible();
    }
  });

  test('Clicking an experience card opens the modal with content', async ({ page }) => {
    const home = new HomePage(page);
    await home.experienceCards.first().click();
    await expect(home.experienceModal).toBeVisible();
    await expect(home.modalTitle).not.toBeEmpty();
    await expect(home.modalDescription).not.toBeEmpty();
  });

  test('Experience modal closes when X button is clicked', async ({ page }) => {
    const home = new HomePage(page);
    await home.experienceCards.first().click();
    await expect(home.experienceModal).toBeVisible();
    await home.modalClose.click();
    await expect(home.experienceModal).toBeHidden();
  });

  test('Experience modal closes when Escape key is pressed', async ({ page }) => {
    const home = new HomePage(page);
    await home.experienceCards.first().click();
    await expect(home.experienceModal).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(home.experienceModal).toBeHidden();
  });

  test('Company name in modal links to LinkedIn profile and shows the LinkedIn icon', async ({ page }) => {
    const home = new HomePage(page);
    await home.experienceCards.first().click();
    await expect(home.experienceModal).toBeVisible();
    await expect(home.modalCompany).toHaveAttribute('href', /linkedin\.com/i);
    await expect(home.modalCompany.locator('svg')).toBeVisible();
  });
});

test.describe('Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('theme', 'light'));
    await page.reload();
  });

  test('Dark mode toggle is visible in the navbar', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.darkModeToggle).toBeVisible();
  });

  test('User can enable dark mode', async ({ page }) => {
    const home = new HomePage(page);
    await expect(page.locator('html')).not.toHaveClass('dark');
    await expect(home.darkModeToggle.locator('i')).toHaveClass('fa-moon');
    await home.darkModeToggle.click();
    await expect(page.locator('html')).toHaveClass('dark');
    await expect(home.darkModeToggle).toHaveAttribute('aria-pressed', 'true');
    await expect(home.darkModeToggle.locator('i')).toHaveClass('fa-sun');
  });

  test('User can disable dark mode', async ({ page }) => {
    const home = new HomePage(page);
    await home.darkModeToggle.click();
    await expect(page.locator('html')).toHaveClass('dark');
    await expect(home.darkModeToggle.locator('i')).toHaveClass('fa-sun');
    await home.darkModeToggle.click();
    await expect(page.locator('html')).not.toHaveClass('dark');
    await expect(home.darkModeToggle).toHaveAttribute('aria-pressed', 'false');
    await expect(home.darkModeToggle.locator('i')).toHaveClass('fa-moon');
  });

  test('Dark mode preference is saved to localStorage', async ({ page }) => {
    const home = new HomePage(page);
    await home.darkModeToggle.click();
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('dark');
  });
});

test.describe('Links & Contact', () => {
  test('User can navigate to GitHub profile', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.githubLink).toHaveAttribute('href', /github\.com\/sarahncrowe/i);
  });

  test('User can navigate to LinkedIn profile', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.linkedinLink).toHaveAttribute('href', /linkedin\.com\/in\//i);
  });

  test('User can find contact information', async ({ page }) => {
    const home = new HomePage(page);
    await expect(home.contactEmail).toBeVisible();
  });

  test('User can open external links in a new tab', async ({ page }) => {
    const externalLinks = await page.locator('a[href^="http"]:not([href*="sarahncrowe.com"])').all();
    expect(externalLinks.length).toBeGreaterThan(0);
    for (const link of externalLinks) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
  });
});
