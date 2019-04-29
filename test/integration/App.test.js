import { ID } from 'constants/steps';
import { SUPPORT_URL } from 'config/urls';

// todo: currently, it works only with local connect, investigate why.
// todo: tests are in experimental phase

describe('User unwraps Trezor and realizes that Hologram is fake', () => {
    before(() => {
        cy.viewport(1024, 768);
        cy.visit('/');
    });

    it('bla', () => {
        // 'Wait for page to load',
        cy.contains('Loading');
        cy.contains('Welcome to Trezor', { timeout: 11000 })
            .getTestElement('onboarding-app')
            .should('be.visible')
            .wait(1000)
            .matchImageSnapshot('welcome');

        cy.getTestElement('button-continue')
            .should('be.visible')
            .click();


        //'Select device'
        cy.contains('Select your device');
        cy.getTestElement('select-device-2')
            .should('be.visible')
            .click();


        // 'No, I made a mistake, I wanted to chose different device'
        cy.getTestElement(`step-${ID.SELECT_DEVICE_STEP}`)
            .should('be.visible')
            .click();
        cy.getTestElement('select-device-2')
            .should('be.visible')
            .click();


        //'Hmm my hologram looks different'
        cy.getTestElement('button-hologram-different')
            .should('be.visible')
            .click();
        cy.contains('Hologram check')
            .getTestElement('onboarding-app')
            .should('be.visible')
            .wait(1000)
            .matchImageSnapshot('hologram-different');

        //'Hmm, no I dont want to contact Trezor support
        cy.getTestElement('button-back')
            .should('be.visible')
            .click();
        cy.contains('Hologram check')
            .getTestElement('onboarding-app')
            .should('be.visible')
            .wait(1000)
            .matchImageSnapshot('hologram');


        //'Actualy, I have changed my mind, I want to contact Trezor support
        cy.getTestElement('button-hologram-different')
            .should('be.visible')
            .click();
        cy.getTestElement('button-contact-support')
            .should('be.visible')
            .click();
        cy.url().should('include', SUPPORT_URL);
    });
});
