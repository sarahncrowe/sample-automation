import { Selector } from 'testcafe';

class PersonalSiteProjects {
  constructor() {
    this.heading = Selector('h1');
    this.description = Selector('[data-testid="repo-header"] p');
    this.playwrightTab = Selector('[data-testid="tab-playwright"]');
    this.testcafeTab = Selector('[data-testid="tab-testcafe"]');
    this.cypressTab = Selector('[data-testid="tab-cypress"]');
    this.fileBrowserPanel = Selector('[data-testid="file-browser"]');
    this.fileItems = Selector('[data-testid^="file-"][data-testid*="."]');
    this.githubLink = Selector('[data-testid="github-repo-link"]');
    this.backToHomeLink = Selector('[data-testid="back-link"]');
  }
}

export const personalSiteProjects = new PersonalSiteProjects();
