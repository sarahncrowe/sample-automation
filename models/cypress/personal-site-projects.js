class PersonalSiteProjects {
  constructor() {
    this.heading = 'h1';
    this.description = '[data-testid="repo-header"] p';
    this.playwrightTab = '[data-testid="tab-playwright"]';
    this.testcafeTab = '[data-testid="tab-testcafe"]';
    this.cypressTab = '[data-testid="tab-cypress"]';
    this.fileBrowserPanel = '[data-testid="file-browser"]';
    this.fileItems = '[data-testid^="file-"][data-testid*="."]';
    this.codeContent = '[data-testid="syntax-highlighter"]';
    this.githubLink = '[data-testid="github-repo-link"]';
    this.stackBlitzLink = '[data-testid="stackblitz-section"] a';
    this.backToHomeLink = '[data-testid="back-link"]';
  }
}

export const personalSiteProjects = new PersonalSiteProjects();
