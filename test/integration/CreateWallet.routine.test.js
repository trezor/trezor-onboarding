describe('Create new wallet routine', () => {
    before(() => {
        cy.viewport(1024, 768);
        cy.visit('/');
    });

    it('User goes through entire process directly (create wallet)', () => {
        cy.contains('Welcome to Trezor')
            .getTestElement('onboarding-app');
        // .matchImageSnapshot('welcome');

        cy.getTestElement('button-continue')
            .should('be.visible')
            .click();

        //'Select device'
        cy.contains('Select your device');
        cy.getTestElement('select-device-2')
            .should('be.visible')
            .click();

        //'Hmm my hologram looks different'
        cy.getTestElement('button-continue')
            .should('be.visible')
            .click();
    });
});
