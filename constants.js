/* Why use constants?

In my experience, human readable constants are easier for maintenance and debugging - particularly when the selector doesn't have a recognizable id or class. For example, say the following assertion (TestCafe) returned false:

await t
    .expect(Selector(div.content > div:nth-child(3) > div > div > div:nth-child(3) > div > a).visible).ok();


Compared to:

await t
    .expect(Selector(submitButton).visible).ok();


With the constant, I know immediately that I'm looking for a submit button and I can quickly determine if the button is actually missing or if the selector just needs to be updated. That brings me to the next perk - when you update the constant, it's immediately updated in all files that use it.

*/

export const logo = '#header_logo > a > img';
export const searchInput = '#search_query_top';
export const searchButton = '#searchbox > button';
export const cartButton = '#header > div:nth-child(3) > div > div > div:nth-child(3) > div > a';

export const callIcon = '#header > div.nav > div > div > nav > span > i.icon-phone';
export const callText = '#header > div.nav > div > div > nav > span';

export const contactUsButton = '#contact-link > a';
export const signInButton = 'div.header_user_info > a.login';
