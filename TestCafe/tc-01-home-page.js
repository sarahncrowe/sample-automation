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
        .expect(true).ok();
});
