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

fixture `TestCafe - Sample Automation`
    .page(environment);

//

test('User can navigate to automationpractice.com home page', async t => {
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
