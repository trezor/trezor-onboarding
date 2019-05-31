import { ID } from '../../src/constants/steps';
import { SUPPORT_URL } from '../../src/config/urls';


describe('Hologram routine', () => {
    before(() => {
        cy.viewport(1024, 768);
        cy.visit('/');
    });

    it('User unwraps Trezor and realizes that Hologram is fake', () => {
        // 'Wait for page to load',
        cy.contains('Loading');
        cy.contains('Welcome to Trezor', { timeout: 11000 })
            .getTestElement('onboarding-app')
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
        cy.getTestElement('select-device-1')
            .should('be.visible')
            .click();

        //'Hmm my hologram looks different'
        cy.getTestElement('button-hologram-different')
            .should('be.visible')
            .click();
        cy.contains('Hologram check')
            .getTestElement('onboarding-app')
            .should('be.visible')
            .matchImageSnapshot('hologram-different');

        //'Hmm, no I dont want to contact Trezor support
        cy.getTestElement('button-back')
            .should('be.visible')
            .click();
        cy.contains('Hologram check')
            .getTestElement('onboarding-app')
            .should('be.visible');

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
