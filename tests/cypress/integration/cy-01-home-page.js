///////////////////////
//      Set Up       //
///////////////////////

import { environment } from '../../environmentConfig.js';
import * as c from '../../constants.js';

///////////////////////
//       Tests       //
///////////////////////

beforeEach(() => {
    cy.visit(environment);
})

describe('Cypress Sample Automation - Homepage', function() {
    
    it('automationpractice.com home page is displayed', () => {

        cy.location().should((location) => {
            expect(location.href).to.equal('http://automationpractice.com/index.php');
        })

        cy.get(c.logo)
          .should('be.visible')
          .invoke('attr', 'alt').should('contain', 'My Store')

         cy.get(c.cartButton)
           .should('be.visible')
           .should('contain', 'Cart')
    })

    it('User can view Popular items', () => {
        cy.get(c.popularItemsTab + '.active')
          .should('exist');

        cy.get(c.popularItems).then(($count) => {
            const itemCount = $count.length;

            for (let i = 1; i <= itemCount; i++){
                cy.get(c.popularItems + ':nth-child('+ i +')')
                  .trigger('mouseover');

                cy.get(c.popularItems + ':nth-child('+ i +') > div > div.right-block > div.button-container > a.button.ajax_add_to_cart_button')
                  .should('be.visible');
                cy.get(c.popularItems + ':nth-child('+ i +') > div > div.right-block > div.button-container > a.button.lnk_view')
                  .should('be.visible');

              cy.get(c.popularItems + ':nth-child('+ i +')')
                .trigger('mouseout');
            }
        })
    })

    it('User can view Best Seller items', () => {
        cy.get(c.bestSellerItemsTab + '.active')
          .should('not.exist');

        cy.get(c.bestSellerItemsTab)
          .click();

        cy.get(c.bestSellerItemsTab + '.active')
          .should('exist');

        cy.get(c.bestSellerItems).then(($count) => {
            const itemCount = $count.length;

            for (let i = 1; i <= itemCount; i++){
                cy.get(c.bestSellerItems + ':nth-child('+ i +')')
                  .trigger('mouseover');

                cy.get(c.bestSellerItems + ':nth-child('+ i +') > div > div.right-block > div.button-container > a.button.ajax_add_to_cart_button')
                  .should('be.visible');
                cy.get(c.bestSellerItems + ':nth-child('+ i +') > div > div.right-block > div.button-container > a.button.lnk_view')
                  .should('be.visible');

              cy.get(c.bestSellerItems + ':nth-child('+ i +')')
                .trigger('mouseout');
            }
        })
    })

    it('User can sign up for Newsletter', () => {
        let invalid1 = 'emailusername';
        let invalid2 = '@email.com';
        let invalid3 = 'test@email';
        let uniqueness = new Date();
        let uniqueEmail = 'email' + (uniqueness.getTime()).toString() + '@email.com';

        cy.get(c.newsletterLabel)
          .should('be.visible')
          .should('contain', 'Newsletter');

        // no domain on email
        cy.get(c.newsletterInput)
          .should('be.visible')
          .invoke('attr', 'value').should('contain', 'Enter your e-mail');

        cy.get(c.newsletterInput)
          .type(invalid1 + '{enter}');

        cy.get(c.newsletterError)
          .should('be.visible')
          .should('contain', 'Newsletter : Invalid email address.');

        cy.get(c.logo)
          .click();
        cy.get(c.newsletterError)
          .should('not.exist');

        // no user in email
        cy.get(c.newsletterInput)
          .type(invalid2 + '{enter}');

        cy.get(c.newsletterError)
          .should('be.visible')
          .should('contain', 'Newsletter : Invalid email address.');

        cy.get(c.logo)
          .click();
        cy.get(c.newsletterError)
          .should('not.exist');

        // no top level domain in email
        cy.get(c.newsletterInput)
          .type(invalid3 + '{enter}');

        cy.get(c.newsletterError)
          .should('be.visible')
          .should('contain', 'Newsletter : Invalid email address.');

        cy.get(c.logo)
          .click();
        cy.get(c.newsletterError)
          .should('not.exist');

        // valid email that has not been previously submitted
        cy.get(c.newsletterInput)
          .type(uniqueEmail + '{enter}');

        cy.get(c.newsletterSuccess)
          .should('be.visible')
          .should('contain', 'Newsletter : You have successfully subscribed to this newsletter.');

    })
})
