import { Selector } from 'testcafe';

class PersonalSiteHome {
  constructor() {
    this.nav = Selector('[data-testid="navbar"]');
    this.navBrand = Selector('[data-testid="nav-brand"]');
    this.heroSection = Selector('[data-testid="hero-section"]');
    this.aboutSection = Selector('[data-testid="about-section"]');
    this.experienceSection = Selector('[data-testid="experience-section"]');
    this.skillsSection = Selector('[data-testid="skills-section"]');
    this.contactSection = Selector('[data-testid="contact-section"]');
    this.heroHeading = Selector('[data-testid="hero-name"]');
    this.aboutText = Selector('[data-testid="about-bio"]');
    this.githubLink = Selector('[data-testid="contact-github"]');
    this.linkedinLink = Selector('[data-testid="contact-linkedin"]');
    this.contactEmail = Selector('[data-testid="contact-email"]');
    this.experienceList = Selector('[data-testid="experience-list"]');
    this.experienceCard = index => Selector(`[data-testid="experience-card-${index}"]`);
    this.experienceModal = Selector('[data-testid="experience-modal"]');
    this.modalClose = Selector('[data-testid="modal-close"]');
    this.modalTitle = Selector('[data-testid="modal-title"]');
    this.modalCompany = Selector('[data-testid="modal-company"]');
    this.modalDescription = Selector('[data-testid="modal-description"]');
    this.modalTags = Selector('[data-testid="modal-tags"]');
  }
}

export const personalSiteHome = new PersonalSiteHome();
