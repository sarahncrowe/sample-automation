import { Selector } from 'testcafe';

class PersonalSiteHome {
  constructor() {
    this.nav = Selector('[data-testid="navbar"]');
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
  }
}

export const personalSiteHome = new PersonalSiteHome();
