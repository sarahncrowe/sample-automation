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

// Experience

test('Experience card grid is visible', async t => {
  await t.expect(home.experienceList.visible).ok().expect(home.experienceCard(0).visible).ok();
});

test('Clicking an experience card opens the modal with content', async t => {
  await t.click(home.experienceCard(0)).expect(home.experienceModal.visible).ok().expect(home.modalTitle.innerText).notEql('');
});

test('Experience modal closes when X button is clicked', async t => {
  await t.click(home.experienceCard(0)).expect(home.experienceModal.visible).ok().click(home.modalClose).expect(home.experienceModal.exists).notOk();
});

test('Experience modal closes when Escape key is pressed', async t => {
  await t.click(home.experienceCard(0)).expect(home.experienceModal.visible).ok().pressKey('esc').expect(home.experienceModal.exists).notOk();
});

test('Company name in modal links to LinkedIn profile and shows the LinkedIn icon', async t => {
  await t
    .click(home.experienceCard(0))
    .expect(home.experienceModal.visible)
    .ok()
    .expect(home.modalCompany.getAttribute('href'))
    .match(/linkedin\.com/i)
    .expect(home.modalCompany.find('svg').visible)
    .ok();
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
