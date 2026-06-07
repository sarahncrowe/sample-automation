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

  it('Company name in modal links to LinkedIn profile and shows the LinkedIn icon', () => {
    cy.get(home.experienceCard(0)).click();
    cy.get(home.experienceModal).should('be.visible');
    cy.get(home.modalCompany)
      .invoke('attr', 'href')
      .should('match', /linkedin\.com/i);
    cy.get(home.modalCompany).find('svg').should('be.visible');
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
