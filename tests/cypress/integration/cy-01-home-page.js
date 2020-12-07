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
})
