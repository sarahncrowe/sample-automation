import { Selector } from 'testcafe';

class PersonalSiteHome {
  nav: Selector;
  navBrand: Selector;
  heroSection: Selector;
  aboutSection: Selector;
  experienceSection: Selector;
  skillsSection: Selector;
  contactSection: Selector;
  heroHeading: Selector;
  aboutText: Selector;
  githubLink: Selector;
  linkedinLink: Selector;
  contactEmail: Selector;
  experienceList: Selector;
  experienceCard: (index: number) => Selector;
  experienceModal: Selector;
  modalClose: Selector;
  modalTitle: Selector;
  modalCompany: Selector;
  modalDescription: Selector;
  modalTags: Selector;
  modalPrev: Selector;
  modalNext: Selector;
  darkModeToggle: Selector;

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
    this.experienceCard = (index: number) => Selector(`[data-testid="experience-card-${index}"]`);
    this.experienceModal = Selector('[data-testid="experience-modal"]');
    this.modalClose = Selector('[data-testid="modal-close"]');
    this.modalTitle = Selector('[data-testid="modal-title"]');
    this.modalCompany = Selector('[data-testid="modal-company"]');
    this.modalDescription = Selector('[data-testid="modal-description"]');
    this.modalTags = Selector('[data-testid="modal-tags"]');
    this.modalPrev = Selector('[data-testid="modal-prev"]');
    this.modalNext = Selector('[data-testid="modal-next"]');
    this.darkModeToggle = Selector('[data-testid="dark-mode-toggle"]');
  }
}

export const personalSiteHome = new PersonalSiteHome();
