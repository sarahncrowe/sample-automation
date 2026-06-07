class PersonalSiteHome {
  constructor() {
    this.nav = '[data-testid="navbar"]';
    this.navBrand = '[data-testid="nav-brand"]';
    this.navLinks = '[data-testid="nav-links"] a';
    this.heroSection = '[data-testid="hero-section"]';
    this.aboutSection = '[data-testid="about-section"]';
    this.experienceSection = '[data-testid="experience-section"]';
    this.skillsSection = '[data-testid="skills-section"]';
    this.contactSection = '[data-testid="contact-section"]';
    this.heroHeading = '[data-testid="hero-name"]';
    this.aboutText = '[data-testid="about-bio"]';
    this.images = 'img';
    this.githubLink = '[data-testid="contact-github"]';
    this.linkedinLink = '[data-testid="contact-linkedin"]';
    this.contactEmail = '[data-testid="contact-email"]';
    this.experienceList = '[data-testid="experience-list"]';
    this.experienceCards = '[data-testid^="experience-card-"]';
    this.experienceModal = '[data-testid="experience-modal"]';
    this.modalClose = '[data-testid="modal-close"]';
    this.modalTitle = '[data-testid="modal-title"]';
    this.modalCompany = '[data-testid="modal-company"]';
    this.modalDescription = '[data-testid="modal-description"]';
    this.modalTags = '[data-testid="modal-tags"]';
    this.modalPrev = '[data-testid="modal-prev"]';
    this.modalNext = '[data-testid="modal-next"]';
    this.darkModeToggle = '[data-testid="dark-mode-toggle"]';
  }

  experienceCard(index) {
    return `[data-testid="experience-card-${index}"]`;
  }
}

export const personalSiteHome = new PersonalSiteHome();
