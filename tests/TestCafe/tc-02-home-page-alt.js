///////////////////////
//      Set Up       //
///////////////////////

// this file uses a Page Model instead of the imported selectors

//import { ClientFunction } from 'testcafe';
//const getLocation = ClientFunction(() => document.location.href);

import { environment } from '../environmentConfig.js';
import { page } from '../pageModel.js';


///////////////////////
//       Tests       //
///////////////////////

fixture `TestCafe Sample Automation - Homepage`
    .page(environment);

//
/*
test('automationpractice.com home page is displayed', async t => {
    await t
        .expect(getLocation()).contains('http://automationpractice.com/index.php');

    await t
        .expect(Selector(c.logo).visible).ok()
        .expect(Selector(c.logo + '[alt=\'My Store\']').exists).ok();

    await t
        .expect(Selector(c.searchInput).visible).ok()
        .expect(Selector(c.searchInput + '[placeholder=\'Search\']').exists).ok()
        .expect(Selector(c.searchButton).visible).ok();

    await t
        .expect(Selector(c.cartButton).visible).ok()
        .expect(Selector(c.cartButton).innerText).contains('Cart');
});
*/
test('User can sign up for Newsletter', async t => {
    let invalid1 = 'emailusername';
    let invalid2 = '@email.com';
    let invalid3 = 'test@email';
    let uniqueness = new Date();
    let uniqueEmail = 'email' + (await uniqueness.getTime()).toString() + '@email.com';

    await t
        .expect(page.newsletterLabel.visible).ok()
        .expect(page.newsletterLabel.innerText).contains('Newsletter');

    await t
        .expect(page.newsletterInput.visible).ok();

    await t
        .typeText(page.newsletterInput, invalid1)
        .pressKey('enter');

    await t
        .expect(page.newsletterError.visible).ok()
        .expect(page.newsletterError.innerText).contains('Newsletter : Invalid email address.');

    await t
        .click(page.logo)
        .expect(page.newsletterError.exists).notOk();

    await t
        .typeText(page.newsletterInput, invalid2)
        .pressKey('enter');

    await t
        .expect(page.newsletterError.visible).ok()
        .expect(page.newsletterError.innerText).contains('Newsletter : Invalid email address.');

    await t
        .click(page.logo)
        .expect(page.newsletterError.exists).notOk();

    await t
        .typeText(page.newsletterInput, invalid3)
        .pressKey('enter');

    await t
        .expect(page.newsletterError.visible).ok()
        .expect(page.newsletterError.innerText).contains('Newsletter : Invalid email address.');

    await t
        .click(page.logo)
        .expect(page.newsletterError.exists).notOk();

    await t
        .typeText(page.newsletterInput, uniqueEmail)
        .pressKey('enter');

    await t
        .expect(page.newsletterSuccess.visible).ok()
        .expect(page.newsletterSuccess.innerText).contains('Newsletter : You have successfully subscribed to this newsletter.');
});
