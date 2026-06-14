import { personalSiteProjects as projects } from '../../../../models/cypress/personal-site-projects';

const PROJECT_NAME = 'sample-automation';

beforeEach(() => {
  cy.visit('/projects');
});

describe('Page Structure', function () {
  it('User can see the page title', () => {
    cy.title().should('match', /sample work/i);
  });

  it('User can see the project name', () => {
    cy.get(projects.heading).should('be.visible').and('contain', PROJECT_NAME);
  });

  it('User can read the project description', () => {
    cy.get(projects.description).should('be.visible').and('not.be.empty');
  });
});

describe('Framework Tabs', function () {
  it('User can see all framework tabs', () => {
    cy.get(projects.playwrightTab).should('be.visible');
    cy.get(projects.testcafeTab).should('be.visible');
    cy.get(projects.cypressTab).should('be.visible');
  });

  it('User can filter files by framework', () => {
    cy.get(projects.fileItems, { timeout: 15000 }).first().should('be.visible');
    cy.get(projects.testcafeTab).click();
    cy.get(projects.fileBrowserPanel).should('be.visible');
    cy.get(projects.fileItems).first().should('be.visible');
  });
});

describe('File Browser', function () {
  it('User can see the file browser', () => {
    cy.get(projects.fileBrowserPanel).should('be.visible');
  });

  it('User can see files on load', () => {
    cy.get(projects.fileItems, { timeout: 15000 }).first().should('be.visible');
    cy.get(projects.fileItems).should('have.length.greaterThan', 0);
  });

  it('User can view file code', () => {
    cy.get(projects.fileItems, { timeout: 15000 }).first().should('be.visible');
    cy.get(projects.fileItems).first().click();
    cy.get(projects.codeContent, { timeout: 10000 }).should('be.visible');
  });
});

describe('Links', function () {
  it('User can navigate to the GitHub repository', () => {
    cy.get(projects.githubLink)
      .invoke('attr', 'href')
      .should('match', /github\.com\/sarahncrowe\/sample-automation/);
  });

  it('User can open the project in StackBlitz', () => {
    cy.get(projects.stackBlitzLink).should('be.visible');
  });

  it('User can navigate back to the home page', () => {
    cy.get(projects.backToHomeLink).click();
    cy.url().should('eq', 'https://sarahncrowe.com/');
  });
});
