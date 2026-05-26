import { ClientFunction } from 'testcafe';
import { personalSiteHome as home } from '../../../models/testcafe/personal-site-home';

const BASE_URL = 'https://sarahncrowe.com';

const getTitle = ClientFunction(() => document.title);
const getLocation = ClientFunction(() => document.location.href);

fixture`Personal Site - Home`.page(BASE_URL);

// Page Structure

test('Page title contains "sarah crowe"', async t => {
  const title = await getTitle();
  await t.expect(title.toLowerCase()).contains('sarah crowe');
});

test('All major sections are visible', async t => {
  await t
    .expect(home.heroSection.visible)
    .ok()
    .expect(home.aboutSection.visible)
    .ok()
    .expect(home.experienceSection.visible)
    .ok()
    .expect(home.skillsSection.visible)
    .ok()
    .expect(home.contactSection.visible)
    .ok();
});

// Navigation

test('Nav bar is visible', async t => {
  await t.expect(home.nav.visible).ok().expect(home.navBrand.visible).ok();
});

// Content

test('Hero heading is visible and non-empty', async t => {
  await t.expect(home.heroHeading.visible).ok().expect(home.heroHeading.innerText).notEql('');
});

test('About section text is visible and non-empty', async t => {
  await t.expect(home.aboutText.visible).ok().expect(home.aboutText.innerText).notEql('');
});

// Links & Contact

test('GitHub link href matches github.com/sarahncrowe', async t => {
  const href = await home.githubLink.getAttribute('href');
  await t.expect(href).match(/github\.com\/sarahncrowe/i);
});

test('LinkedIn link href matches linkedin.com/in/', async t => {
  const href = await home.linkedinLink.getAttribute('href');
  await t.expect(href).match(/linkedin\.com\/in\//i);
});

test('Contact email is visible', async t => {
  await t.expect(home.contactEmail.visible).ok();
});
