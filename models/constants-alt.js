/* Why use named selectors?

In my experience, human readable named selectors are easier for maintenance and debugging - particularly when the selector doesn't have
a recognizable id or class. For example, say the following assertion (TestCafe) returned false:

await t
    .expect(Selector(div.content > div:nth-child(3) > div > div > div:nth-child(3) > div > a).visible).ok();


Compared to:

await t
    .expect(Selector(submitButton).visible).ok();


With the named selector, I know immediately that I'm looking for a submit button and I can quickly determine if the button is actually
missing or if the selector just needs to be updated. That brings me to the next perk - when you update the named selector, it's immediately
updated in all files that use it.

*/
module.exports = {
    // header

    logo : '#header_logo > a > img',
    searchInput : '#search_query_top',
    searchButton : '#searchbox > button',
    cartButton : '#header > div:nth-child(3) > div > div > div:nth-child(3) > div > a',

    callIcon : '#header > div.nav > div > div > nav > span > i.icon-phone',
    callText : '#header > div.nav > div > div > nav > span',

    contactUsButton : '#contact-link > a',
    signInButton : 'div.header_user_info > a.login',


    // menu

    menuCategoryWomen : '#block_top_menu > ul > li:nth-child(1) > a',
    menuCategoryDresses : '#block_top_menu > ul > li:nth-child(2) > a',
    menuCategoryTshirts : '#block_top_menu > ul > li:nth-child(3) > a',

    menuWomenSubmenu : '#block_top_menu > ul > li:nth-child(1) > ul',
    menuDressesSubmenu : '#block_top_menu > ul > li:nth-child(2) > ul',


    menuWomenSubcategoryLinks : '#block_top_menu > ul > li:nth-child(1) > ul > li',

    menuWomenSubTops : '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(1) > a',
    menuWomenSubTopsSubTshirts : '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(1) > ul > li:nth-child(1) > a',
    menuWomenSubTopsSubBlouses : '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(1) > ul > li:nth-child(2) > a',
    menuWomenSubDresses : '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(2) > a',
    menuWomenSubDressesSubCasual : '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(2) > ul > li:nth-child(1) > a',
    menuWomenSubDressesSubEvening : '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(2) > ul > li:nth-child(2) > a',
    menuWomenSubDressesSubSummer : '#block_top_menu > ul > li:nth-child(1) > ul > li:nth-child(2) > ul > li:nth-child(3) > a',
    menuWomenThumbnail1 : '#category-thumbnail > div:nth-child(1) > img',
    menuWomenThumbnail2 : '#category-thumbnail > div:nth-child(2) > img',

    menuDressesSubcategoryLinks : '#block_top_menu > ul > li:nth-child(2) > ul > li',

    menuDressesSubCasual : '#block_top_menu > ul > li:nth-child(2) > ul > li:nth-child(1) > a',
    menuDressesSubEvening : '#block_top_menu > ul > li:nth-child(2) > ul > li:nth-child(2) > a',
    menuDressesSubSummer : '#block_top_menu > ul > li:nth-child(2) > ul > li:nth-child(3) > a',



    // homepage - content

    popularItemsTab : '#home-page-tabs > li:nth-child(1)',
    bestSellerItemsTab : '#home-page-tabs > li:nth-child(2)',
    popularItems : '#homefeatured > li.ajax_block_product',
    bestSellerItems : '#blockbestsellers > li.ajax_block_product',

    newsletterLabel : '#newsletter_block_left > h4',
    newsletterInput : '#newsletter-input',
    newsletterSuccess : '#columns > p.alert-success',
    newsletterError : '#columns > p.alert-danger',



    // category page

    categoryTitle : '#center_column > h1.page-heading.product-listing > span.cat-name'
}
