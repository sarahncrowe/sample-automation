import { ClientFunction } from 'testcafe';
import { personalSiteProjects as projects } from '../../../models/testcafe/personal-site-projects';

const BASE_URL = `${process.env.BASE_URL || 'https://sarahncrowe.com'}/projects`;
const PROJECT_NAME = 'sample-automation';

const getTitle = ClientFunction(() => document.title);
const getLocation = ClientFunction(() => document.location.href);

fixture`Personal Site - Projects`.page(BASE_URL);

// Page Structure

test('Page title contains "sample work"', async t => {
  const title = await getTitle();
  await t.expect(title.toLowerCase()).contains('sample work');
});

test('Project heading displays "sample-automation"', async t => {
  await t.expect(projects.heading.innerText).eql(PROJECT_NAME);
});

test('Project description is visible and non-empty', async t => {
  await t.expect(projects.description.visible).ok().expect(projects.description.innerText).notEql('');
});

// Framework Tabs

test('All three framework tabs are visible', async t => {
  await t.expect(projects.playwrightTab.visible).ok().expect(projects.testcafeTab.visible).ok().expect(projects.cypressTab.visible).ok();
});

test('Clicking TestCafe tab shows file browser', async t => {
  await t.expect(projects.fileItems.nth(0).visible).ok({ timeout: 15000 }).click(projects.testcafeTab).expect(projects.fileBrowserPanel.visible).ok();
});

// File Browser

test('Files are visible on load', async t => {
  await t.expect(projects.fileItems.nth(0).visible).ok({ timeout: 15000 });
  const count = await projects.fileItems.count;
  await t.expect(count).gt(0);
});

// Links

test('GitHub repo link href matches the repository URL', async t => {
  const href = await projects.githubLink.getAttribute('href');
  await t.expect(href).match(/github\.com\/sarahncrowe\/sample-automation/i);
});

test('Back-to-home link navigates to home page', async t => {
  await t.click(projects.backToHomeLink);
  const url = await getLocation();
  await t.expect(url).eql('https://sarahncrowe.com/');
});
