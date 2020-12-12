///////////////////////
//      Set Up       //
///////////////////////

import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

import { environment } from '../environmentConfig.js';
import * as c from '../constants.js';

const getLocation = ClientFunction(() => document.location.href);

///////////////////////
//       Tests       //
///////////////////////

fixture `TestCafe Sample Automation - Homepage`
    .page(environment);

//

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

test('User can navigate to all menu items', async t => {

    { // WOMEN CATEGORY
        let subcategories = ['TOPS', 'DRESSES'];
        let subsubcategories = [['T-shirts', 'Blouses'],['Casual', 'Evening', 'Summer']];

        await t
            .expect(Selector(c.menuCategoryWomen).visible).ok()
            .expect(Selector(c.menuCategoryWomen).innerText).contains('WOMEN');

        await t
            .hover(c.menuCategoryWomen)
            .wait(1000);

        await t
            .expect(Selector(c.menuWomenSubmenu).visible).ok()
            .expect(Selector(c.menuWomenThumbnail1).visible).ok()
            .expect(Selector(c.menuWomenThumbnail2).visible).ok();

        let subcategoryCount = await Selector(c.menuWomenSubcategoryLinks).count;
        for (let i = 1; i < subcategoryCount; i++){
            await t
                .expect(
                    Selector(c.menuWomenSubcategoryLinks + ':nth-child('+ i +')').innerText
                ).contains(subcategories[i-1]);

            await t
                .click(c.menuWomenSubcategoryLinks + ':nth-child('+ i +') > a');

            await t
                .expect(
                    Selector(c.categoryTitle).innerText
                ).contains(subcategories[i-1]);

            await t
                .hover(c.menuCategoryWomen);

            let subsubCount = await Selector(c.menuWomenSubcategoryLinks + ':nth-child('+i+') > ul > li').count;
            for (let j = 1; j <= subsubCount; j++){
                await t
                    .expect(
                        Selector(c.menuWomenSubcategoryLinks + ':nth-child('+i+') > ul > li:nth-child('+j+')').innerText
                    ).contains(subsubcategories[i-1][j-1]);

                await t
                    .click(c.menuWomenSubcategoryLinks + ':nth-child('+i+') > ul > li:nth-child('+j+') > a');

                await t
                    .expect(
                        Selector(c.categoryTitle).innerText
                    ).contains(subsubcategories[i-1][j-1].toUpperCase());

                await t
                    .hover(c.menuCategoryWomen);
            }
        }
    }


    { // Dresses
        let subcategories = ['CASUAL DRESSES', 'EVENING DRESSES', 'SUMMER DRESSES'];

        await t
            .expect(Selector(c.menuCategoryDresses).visible).ok()
            .expect(Selector(c.menuCategoryDresses).innerText).contains('DRESSES');

        await t
            .hover(c.menuCategoryDresses)
            .wait(1000);

        await t
            .expect(Selector(c.menuDressesSubmenu).visible).ok();

        let subcategoryCount = await Selector(c.menuDressesSubcategoryLinks).count;
        for (let k = 1; k <= subcategoryCount; k++){
            await t
                .expect(
                    Selector(c.menuDressesSubcategoryLinks + ':nth-child('+ k +')').innerText
                ).contains(subcategories[k-1]);

            await t
                .click(c.menuDressesSubcategoryLinks + ':nth-child('+ k +') > a');

            await t
                .expect(
                    Selector(c.categoryTitle).innerText
                ).contains(subcategories[k-1]);

            await t
                .hover(c.menuCategoryDresses);
        }
    }


    { // T-Shirts Menu Item
        await t
            .expect(Selector(c.menuCategoryTshirts).visible).ok()
            .expect(Selector(c.menuCategoryTshirts).innerText).contains('T-SHIRTS');

        await t
            .click(c.menuCategoryTshirts);

        await t
            .expect(Selector(c.categoryTitle).innerText).contains('T-SHIRTS');
    }
});

test('User can view Popular items', async t => {
    await t
        .expect(Selector(c.popularItemsTab + '.active').exists).ok();

    let itemCount = await Selector(c.popularItems).count;
    for (let i = 1; i <= itemCount; i++){
        await t
            .hover(c.popularItems + ':nth-child('+ i +')')
            .expect(Selector(c.popularItems + ':nth-child('+ i +') > div > div.right-block > div.button-container > a.button.ajax_add_to_cart_button').visible).ok()
            .expect(Selector(c.popularItems + ':nth-child('+ i +') > div > div.right-block > div.button-container > a.button.lnk_view').visible).ok();
    }
});

test('User can view Best Seller items', async t => {
    await t
        .expect(Selector(c.bestSellerItemsTab + '.active').exists).notOk();

    await t
        .click(c.bestSellerItemsTab);

    await t
        .expect(Selector(c.bestSellerItemsTab + '.active').exists).ok();

    let itemCount = await Selector(c.bestSellerItems).count;
    for (let i = 1; i <= itemCount; i++){
        await t
            .hover(c.bestSellerItems + ':nth-child('+ i +')')
            .expect(Selector(c.bestSellerItems + ':nth-child('+ i +') > div > div.right-block > div.button-container > a.button.ajax_add_to_cart_button').visible).ok()
            .expect(Selector(c.bestSellerItems + ':nth-child('+ i +') > div > div.right-block > div.button-container > a.button.lnk_view').visible).ok();
    }
});

test('User can sign up for Newsletter', async t => {
    let invalid1 = 'emailusername';
    let invalid2 = '@email.com';
    let invalid3 = 'test@email';
    let uniqueness = new Date();
    let uniqueEmail = 'email' + (await uniqueness.getTime()).toString() + '@email.com';

    await t
        .expect(Selector(c.newsletterLabel).visible).ok()
        .expect(Selector(c.newsletterLabel).innerText).contains('Newsletter');

    await t
        .expect(Selector(c.newsletterInput).visible).ok()
        .expect(Selector(c.newsletterInput + '[value=\'Enter your e-mail\']').exists).ok();

    await t
        .typeText(c.newsletterInput, invalid1)
        .pressKey('enter');

    await t
        .expect(Selector(c.newsletterError).visible).ok()
        .expect(Selector(c.newsletterError).innerText).contains('Newsletter : Invalid email address.');

    await t
        .click(c.logo)
        .expect(Selector(c.newsletterError).exists).notOk();

    await t
        .typeText(c.newsletterInput, invalid2)
        .pressKey('enter');

    await t
        .expect(Selector(c.newsletterError).visible).ok()
        .expect(Selector(c.newsletterError).innerText).contains('Newsletter : Invalid email address.');

    await t
        .click(c.logo)
        .expect(Selector(c.newsletterError).exists).notOk();

    await t
        .typeText(c.newsletterInput, invalid3)
        .pressKey('enter');

    await t
        .expect(Selector(c.newsletterError).visible).ok()
        .expect(Selector(c.newsletterError).innerText).contains('Newsletter : Invalid email address.');

    await t
        .click(c.logo)
        .expect(Selector(c.newsletterError).exists).notOk();

    await t
        .typeText(c.newsletterInput, uniqueEmail)
        .pressKey('enter');

    await t
        .expect(Selector(c.newsletterSuccess).visible).ok()
        .expect(Selector(c.newsletterSuccess).innerText).contains('Newsletter : You have successfully subscribed to this newsletter.');
});
