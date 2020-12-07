/* Why use constants?

In my experience, human readable constants are easier for maintenance and debugging - particularly when the selector doesn't have
a recognizable id or class. For example, say the following assertion (TestCafe) returned false:

await t
    .expect(Selector(div.content > div:nth-child(3) > div > div > div:nth-child(3) > div > a).visible).ok();


Compared to:

await t
    .expect(Selector(submitButton).visible).ok();


With the constant, I know immediately that I'm looking for a submit button and I can quickly determine if the button is actually
missing or if the selector just needs to be updated. That brings me to the next perk - when you update the constant, it's immediately
updated in all files that use it.

*/

// header

export const logo = '#header_logo > a > img';
export const searchInput = '#search_query_top';
export const searchButton = '#searchbox > button';
export const cartButton = '#header > div:nth-child(3) > div > div > div:nth-child(3) > div > a';

export const callIcon = '#header > div.nav > div > div > nav > span > i.icon-phone';
export const callText = '#header > div.nav > div > div > nav > span';

export const contactUsButton = '#contact-link > a';
export const signInButton = 'div.header_user_info > a.login';


// menu

export const menuCategoryWomen = '#block_top_menu > ul > li:nth-child(1) > a';
export const menuCategoryDresses = '#block_top_menu > ul > li:nth-child(2) > a';
export const menuCategoryTshirts = '#block_top_menu > ul > li:nth-child(3) > a';

export const menuWomenSubmenu = '#block_top_menu > ul > li:nth-child(1) > ul';
export const menuDressesSubmenu = '#block_top_menu > ul > li:nth-child(2) > ul';


export const menuWomenSubcategoryLinks = '#block_top_menu > ul > li:nth-child(1) > ul > li';

export const menuWomenSubTops = '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(1) > a';
export const menuWomenSubTopsSubTshirts = '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(1) > ul > li:nth-child(1) > a';
export const menuWomenSubTopsSubBlouses = '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(1) > ul > li:nth-child(2) > a';
export const menuWomenSubDresses = '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(2) > a';
export const menuWomenSubDressesSubCasual = '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(2) > ul > li:nth-child(1) > a';
export const menuWomenSubDressesSubEvening = '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(2) > ul > li:nth-child(2) > a';
export const menuWomenSubDressesSubSummer = '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(2) > ul > li:nth-child(3) > a';
export const menuWomenThumbnail1 = '#category-thumbnail > div:nth-child(1) > img';
export const menuWomenThumbnail2 = '#category-thumbnail > div:nth-child(2) > img';

export const menuDressesSubCasual = '#block_top_menu > ul > li:nth-child(2) > ul > li:nth-child(1) > a';
export const menuDressesSubEvening = '#block_top_menu > ul > li:nth-child(2) > ul > li:nth-child(2) > a';
export const menuDressesSubSummer = '#block_top_menu > ul > li:nth-child(2) > ul > li:nth-child(3) > a';



// homepage - content

export const popularItemsTab = '#home-page-tabs > li:nth-child(1)';
export const bestSellerItemsTab = '#home-page-tabs > li:nth-child(2)';
export const popularItems = '#homefeatured > li.ajax_block_product';
export const bestSellerItems = '#blockbestsellers > li.ajax_block_product';

export const newsletterLabel = '#newsletter_block_left > h4';
export const newsletterInput = '#newsletter-input';
export const newsletterSuccess = '#columns > p.alert-success';
export const newsletterError = '#columns > p.alert-danger';



// category page

export const categoryTitle = '#center_column > h1.page-heading.product-listing > span.cat-name';
