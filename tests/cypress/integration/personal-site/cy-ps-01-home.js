import { personalSiteHome as home } from '../../../../models/cypress/personal-site-home.js';

beforeEach(() => {
  cy.visit('/');
});

describe('Page Structure', function () {
  it('User can see the page title', () => {
    cy.title().should('match', /sarah\s*crowe/i);
  });

  it('User can see all major sections', () => {
    cy.get(home.heroSection).should('be.visible');
    cy.get(home.aboutSection).should('be.visible');
    cy.get(home.experienceSection).should('be.visible');
    cy.get(home.skillsSection).should('be.visible');
    cy.get(home.contactSection).should('be.visible');
  });
});

describe('Navigation', function () {
  it('User can see the navigation bar', () => {
    cy.get(home.nav).should('be.visible');
    cy.get(home.navBrand).should('be.visible');
    cy.get(home.navLinks).first().should('be.visible');
  });

  it('User can navigate to page sections', () => {
    const navSections = [
      { linkName: 'About', sectionId: '#about-detail' },
      { linkName: 'Experience', sectionId: '#experience' },
      { linkName: 'Skills', sectionId: '#skills' },
      { linkName: 'Contact', sectionId: '#contact' },
    ];

    navSections.forEach(({ linkName, sectionId }) => {
      cy.get(home.navLinks).contains(linkName).click();
      cy.get(sectionId).should('be.visible');
    });
  });
});

describe('Content', function () {
  it('User can read the hero introduction', () => {
    cy.get(home.heroSection).should('be.visible');
    cy.get(home.heroHeading).should('be.visible').and('not.be.empty');
  });

  it('User can read the about section', () => {
    cy.get(home.aboutSection).should('be.visible');
    cy.get(home.aboutText).should('be.visible').and('not.be.empty');
  });

  it('User can see all images', () => {
    cy.get(home.images).each($img => {
      cy.wrap($img).should('have.prop', 'naturalWidth').and('be.greaterThan', 0);
    });
  });
});

describe('Experience', function () {
  it('Experience card grid is visible with all cards', () => {
    cy.get(home.experienceList).should('be.visible');
    cy.get(home.experienceCards).should('have.length.greaterThan', 0);
    cy.get(home.experienceCards).each($card => {
      cy.wrap($card).should('be.visible');
    });
  });

  it('Clicking an experience card opens the modal with content', () => {
    cy.get(home.experienceCard(0)).click();
    cy.get(home.experienceModal).should('be.visible');
    cy.get(home.modalTitle).should('not.be.empty');
    cy.get(home.modalDescription).should('not.be.empty');
  });

  it('Experience modal closes when X button is clicked', () => {
    cy.get(home.experienceCard(0)).click();
    cy.get(home.experienceModal).should('be.visible');
    cy.get(home.modalClose).click();
    cy.get(home.experienceModal).should('not.exist');
  });

  it('Experience modal closes when Escape key is pressed', () => {
    cy.get(home.experienceCard(0)).click();
    cy.get(home.experienceModal).should('be.visible');
    cy.get('body').type('{esc}');
    cy.get(home.experienceModal).should('not.exist');
  });

  it('First card does not show previous arrow', () => {
    cy.get(home.experienceCard(0)).click();
    cy.get(home.experienceModal).should('be.visible');
    cy.get(home.modalPrev).should('not.exist');
  });

  it('First card shows next arrow', () => {
    cy.get(home.experienceCard(0)).click();
    cy.get(home.experienceModal).should('be.visible');
    cy.get(home.modalNext).should('be.visible');
  });

  it('Clicking next arrow navigates to the next card', () => {
    cy.get(home.experienceCard(0)).click();
    cy.get(home.experienceModal).should('be.visible');
    cy.get(home.modalTitle)
      .invoke('text')
      .then(firstTitle => {
        cy.get(home.modalNext).click();
        cy.get(home.modalTitle).should('not.have.text', firstTitle);
        cy.get(home.modalPrev).should('be.visible');
      });
  });

  it('Last card does not show next arrow', () => {
    cy.get(home.experienceCards).last().click();
    cy.get(home.experienceModal).should('be.visible');
    cy.get(home.modalNext).should('not.exist');
  });

  it('Last card shows previous arrow', () => {
    cy.get(home.experienceCards).last().click();
    cy.get(home.experienceModal).should('be.visible');
    cy.get(home.modalPrev).should('be.visible');
  });

  it('Clicking previous arrow navigates to the previous card', () => {
    cy.get(home.experienceCards).last().click();
    cy.get(home.experienceModal).should('be.visible');
    cy.get(home.modalTitle)
      .invoke('text')
      .then(lastTitle => {
        cy.get(home.modalPrev).click();
        cy.get(home.modalTitle).should('not.have.text', lastTitle);
        cy.get(home.modalNext).should('be.visible');
      });
  });

  it('ArrowRight key navigates to the next card', () => {
    cy.get(home.experienceCard(0)).click();
    cy.get(home.experienceModal).should('be.visible');
    cy.get(home.modalTitle)
      .invoke('text')
      .then(firstTitle => {
        cy.get('body').type('{rightarrow}');
        cy.get(home.modalTitle).should('not.have.text', firstTitle);
      });
  });

  it('ArrowLeft key navigates to the previous card', () => {
    cy.get(home.experienceCard(1)).click();
    cy.get(home.experienceModal).should('be.visible');
    cy.get(home.modalTitle)
      .invoke('text')
      .then(secondTitle => {
        cy.get('body').type('{leftarrow}');
        cy.get(home.modalTitle).should('not.have.text', secondTitle);
        cy.get(home.modalPrev).should('not.exist');
      });
  });

  it('Company name in modal links to LinkedIn profile and shows the LinkedIn icon', () => {
    cy.get(home.experienceCard(0)).click();
    cy.get(home.experienceModal).should('be.visible');
    cy.get(home.modalCompany)
      .invoke('attr', 'href')
      .should('match', /linkedin\.com/i);
    cy.get(home.modalCompany).find('svg').should('be.visible');
  });
});

describe('Dark Mode', function () {
  beforeEach(() => {
    cy.window().then(win => win.localStorage.setItem('theme', 'light'));
    cy.reload();
  });

  it('Dark mode toggle is visible in the navbar', () => {
    cy.get(home.darkModeToggle).should('be.visible');
  });

  it('User can enable dark mode', () => {
    cy.get('html').should('not.have.class', 'dark');
    cy.get(home.darkModeToggle).find('svg[data-icon="moon"]').should('exist');
    cy.get(home.darkModeToggle).click();
    cy.get('html').should('have.class', 'dark');
    cy.get(home.darkModeToggle).should('have.attr', 'aria-pressed', 'true');
    cy.get(home.darkModeToggle).find('svg[data-icon="sun"]').should('exist');
  });

  it('User can disable dark mode', () => {
    cy.get(home.darkModeToggle).click();
    cy.get('html').should('have.class', 'dark');
    cy.get(home.darkModeToggle).find('svg[data-icon="sun"]').should('exist');
    cy.get(home.darkModeToggle).click();
    cy.get('html').should('not.have.class', 'dark');
    cy.get(home.darkModeToggle).should('have.attr', 'aria-pressed', 'false');
    cy.get(home.darkModeToggle).find('svg[data-icon="moon"]').should('exist');
  });

  it('Dark mode preference is saved to localStorage', () => {
    cy.get(home.darkModeToggle).click();
    cy.window().its('localStorage').invoke('getItem', 'theme').should('eq', 'dark');
  });
});

describe('Links & Contact', function () {
  it('User can navigate to GitHub profile', () => {
    cy.get(home.githubLink)
      .invoke('attr', 'href')
      .should('match', /github\.com\/sarahncrowe/i);
  });

  it('User can navigate to LinkedIn profile', () => {
    cy.get(home.linkedinLink)
      .invoke('attr', 'href')
      .should('match', /linkedin\.com\/in\//i);
  });

  it('User can find contact information', () => {
    cy.get(home.contactEmail).should('be.visible');
  });

  it('User can open external links in a new tab', () => {
    cy.get('a[href^="http"]:not([href*="sarahncrowe.com"])').should('have.length.greaterThan', 0);
    cy.get('a[href^="http"]:not([href*="sarahncrowe.com"])').each($link => {
      cy.wrap($link).should('have.attr', 'target', '_blank');
      cy.wrap($link)
        .invoke('attr', 'rel')
        .should('match', /noopener/);
    });
  });
});
