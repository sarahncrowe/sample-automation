import { ClientFunction, Selector } from 'testcafe';
import { personalSiteHome as home } from '../../../models/testcafe/personal-site-home';

const setTheme = ClientFunction(theme => localStorage.setItem('theme', theme));
const getTheme = ClientFunction(() => localStorage.getItem('theme'));
const getHtmlClass = ClientFunction(() => document.documentElement.className);

const BASE_URL = process.env.BASE_URL || 'https://sarahncrowe.com';

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

test('First card does not show previous arrow', async t => {
  await t.click(home.experienceCard(0)).expect(home.experienceModal.visible).ok().expect(home.modalPrev.exists).notOk();
});

test('First card shows next arrow', async t => {
  await t.click(home.experienceCard(0)).expect(home.experienceModal.visible).ok().expect(home.modalNext.visible).ok();
});

test('Clicking next arrow navigates to the next card', async t => {
  await t.click(home.experienceCard(0)).expect(home.experienceModal.visible).ok();
  const firstTitle = await home.modalTitle.innerText;
  await t.click(home.modalNext);
  await t.expect(home.modalTitle.innerText).notEql(firstTitle).expect(home.modalPrev.visible).ok();
});

test('Last card does not show next arrow', async t => {
  const cardCount = await Selector('[data-testid^="experience-card-"]').count;
  await t
    .click(home.experienceCard(cardCount - 1))
    .expect(home.experienceModal.visible)
    .ok()
    .expect(home.modalNext.exists)
    .notOk();
});

test('Last card shows previous arrow', async t => {
  const cardCount = await Selector('[data-testid^="experience-card-"]').count;
  await t
    .click(home.experienceCard(cardCount - 1))
    .expect(home.experienceModal.visible)
    .ok()
    .expect(home.modalPrev.visible)
    .ok();
});

test('Clicking previous arrow navigates to the previous card', async t => {
  const cardCount = await Selector('[data-testid^="experience-card-"]').count;
  await t
    .click(home.experienceCard(cardCount - 1))
    .expect(home.experienceModal.visible)
    .ok();
  const lastTitle = await home.modalTitle.innerText;
  await t.click(home.modalPrev);
  await t.expect(home.modalTitle.innerText).notEql(lastTitle).expect(home.modalNext.visible).ok();
});

test('ArrowRight key navigates to the next card', async t => {
  await t.click(home.experienceCard(0)).expect(home.experienceModal.visible).ok();
  const firstTitle = await home.modalTitle.innerText;
  await t.pressKey('right');
  await t.expect(home.modalTitle.innerText).notEql(firstTitle);
});

test('ArrowLeft key navigates to the previous card', async t => {
  await t.click(home.experienceCard(1)).expect(home.experienceModal.visible).ok();
  const secondTitle = await home.modalTitle.innerText;
  await t.pressKey('left');
  await t.expect(home.modalTitle.innerText).notEql(secondTitle).expect(home.modalPrev.exists).notOk();
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

test('Contact email is visible and correct', async t => {
  await t.expect(home.contactEmail.visible).ok();
  await t.expect(home.contactEmail.getAttribute('href')).eql('mailto:contact@sarahncrowe.com');
  await t.expect(home.contactEmail.getAttribute('aria-label')).eql('Email contact@sarahncrowe.com');
});

// Dark Mode

fixture`Personal Site - Home - Dark Mode`.page(BASE_URL).beforeEach(async t => {
  await setTheme('light');
  await t.navigateTo(BASE_URL);
});

test('Dark mode toggle is visible in the navbar', async t => {
  await t.expect(home.darkModeToggle.visible).ok();
});

test('User can enable dark mode', async t => {
  await t.expect(getHtmlClass()).notContains('dark');
  await t.expect(home.darkModeToggle.find('svg[data-icon="moon"]').exists).ok();
  await t.click(home.darkModeToggle);
  await t.expect(getHtmlClass()).contains('dark').expect(home.darkModeToggle.getAttribute('aria-pressed')).eql('true');
  await t.expect(home.darkModeToggle.find('svg[data-icon="sun"]').exists).ok();
});

test('User can disable dark mode', async t => {
  await t.click(home.darkModeToggle);
  await t.expect(getHtmlClass()).contains('dark');
  await t.expect(home.darkModeToggle.find('svg[data-icon="sun"]').exists).ok();
  await t.click(home.darkModeToggle);
  await t.expect(getHtmlClass()).notContains('dark').expect(home.darkModeToggle.getAttribute('aria-pressed')).eql('false');
  await t.expect(home.darkModeToggle.find('svg[data-icon="moon"]').exists).ok();
});

test('Dark mode preference is saved to localStorage', async t => {
  await t.click(home.darkModeToggle);
  await t.expect(getTheme()).eql('dark');
});
