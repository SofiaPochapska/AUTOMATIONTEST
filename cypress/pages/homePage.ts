export class HomePage {
    constructor(){}
    visit(){
        cy.visit('/')
        cy.url().should('eq', 'https://theconnectedshop.com/')
    }
}