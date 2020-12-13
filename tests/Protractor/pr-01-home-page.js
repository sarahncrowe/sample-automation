///////////////////////
//      Set Up       //
///////////////////////

const env = require('../environmentConfig-alt.js');
const c = require('../constants-alt.js');

///////////////////////
//       Tests       //
///////////////////////


describe('Protractor Sample Automation - Homepage', function() {

    beforeEach(function() {
        browser.waitForAngularEnabled(false),
        browser.get(env.environment)
    });

    it('automationpractice.com home page is displayed', function() {

        browser.waitForAngularEnabled(false);
        browser.get('http://automationpractice.com/index.php')

        expect(element(by.css(c.logo)).isDisplayed()).toBeTruthy();
        expect(element(by.css(c.logo + '[alt=\'My Store\']')).isPresent()).toBeTruthy();

        expect(element(by.css(c.searchInput)).isDisplayed()).toBeTruthy();
        expect(element(by.css(c.searchInput + '[placeholder=\'Search\']')).isPresent()).toBeTruthy();
        expect(element(by.css(c.searchButton)).isDisplayed()).toBeTruthy();

        expect(element(by.css(c.cartButton)).isDisplayed()).toBeTruthy();
        expect(element(by.css(c.cartButton)).getText()).toContain('Cart');
    });

    it('User can sign up for Newsletter', () => {
        let invalid1 = 'emailusername';
        let invalid2 = '@email.com';
        let invalid3 = 'test@email';
        let uniqueness = new Date();
        let uniqueEmail = 'email' + (uniqueness.getTime()).toString() + '@email.com';

        let logo = element(by.css(c.logo));
        let newsletterLabel = element(by.css(c.newsletterLabel));
        let newsletterInput = element(by.css(c.newsletterInput));

        expect(newsletterLabel.isDisplayed()).toBeTruthy();
        expect(newsletterLabel.getText()).toContain('Newsletter');

        // no domain on email
        expect(newsletterInput.isDisplayed()).toBeTruthy();
        newsletterInput.sendKeys(invalid1, protractor.Key.ENTER);

        expect(element(by.css(c.newsletterError)).isDisplayed()).toBeTruthy();
        expect(element(by.css(c.newsletterError)).getText()).toContain('Newsletter : Invalid email address.').then( function () {
            logo.click();
            expect(element(by.css(c.newsletterError)).isPresent()).toBeFalsy();
        });
        browser.sleep(1000);

        /*NOTE: I'm fully aware using browser.sleep() is not ideal - I intend on replacing it*/

        // no user in email
        newsletterInput.sendKeys(invalid2, protractor.Key.ENTER);

        expect(element(by.css(c.newsletterError)).isDisplayed()).toBeTruthy();
        expect(element(by.css(c.newsletterError)).getText()).toContain('Newsletter : Invalid email address.').then( function () {
            logo.click();
            expect(element(by.css(c.newsletterError)).isPresent()).toBeFalsy();
        });
        browser.sleep(1000);

        // no top level domain
        newsletterInput.sendKeys(invalid3, protractor.Key.ENTER);

        expect(element(by.css(c.newsletterError)).isDisplayed()).toBeTruthy();
        expect(element(by.css(c.newsletterError)).getText()).toContain('Newsletter : Invalid email address.').then( function () {
            logo.click();
            expect(element(by.css(c.newsletterError)).isPresent()).toBeFalsy();
        });
        browser.sleep(1000);

        // no user in email
        newsletterInput.sendKeys(uniqueEmail, protractor.Key.ENTER);

        browser.sleep(1000); // success message not being displayed right away? Investigate.

        expect(element(by.css(c.newsletterSuccess)).isDisplayed()).toBeTruthy();
        expect(element(by.css(c.newsletterSuccess)).getText()).toContain('Newsletter : You have successfully subscribed to this newsletter.');
    });
});
