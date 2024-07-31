import { Selector } from 'testcafe';

class Page {
	constructor() {
		this.logo = Selector('#header_logo > a > img');

		this.newsletterLabel = Selector('#newsletter_block_left > h4');
		this.newsletterInput = Selector('#newsletter-input');
		this.newsletterSuccess = Selector('#columns > p.alert-success');
		this.newsletterError = Selector('#columns > p.alert-danger');
	}
}

export const page = new Page();

/*
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

export const menuDressesSubcategoryLinks = '#block_top_menu > ul > li:nth-child(2) > ul > li';

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

*/
