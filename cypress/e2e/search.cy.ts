describe('The Connected Shop - Search', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', 'https://theconnectedshop.com/');
  });

  it('checks that search bar has a placeholder', () => {
    cy.get('#Search-In-Inline')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Search');
  });

  it('checks that search bar is not active by default', () => {
    cy.get('#Search-In-Inline')
      .should('be.visible').and('not.be.focused');
  });

  it('checks that search bar becomes focused on click', () => {
    cy.get('#Search-In-Inline')
      .should('be.visible')
      .and('not.be.focused') //not focused yet
      .click()
      .should('be.focused');
  });

  it('finds an existing product', () => {
    cy.get('#Search-In-Inline')
      .should('be.visible')
      .type('Dummy Handle')
      .should('have.value', 'Dummy Handle');
    // cy.wait(3000); //temporary solution
    cy.get('button.search__button--header')
      .first()
      .click(); 
    cy.url().should('include', '/search?q=Dummy+Handle');
    cy.get('#results-product-list-1').should('be.visible');
    cy.get('#results-product-list-1 ul > li')
      .first()
      .find('a span.card__heading__product-title')
      .should('contain.text', 'Dummy Handle');
  });

  it('does not return anything if requested item does not exist', () => {
    cy.get('#Search-In-Inline')
      .should('be.visible')
      .type('Blablabla')
      .should('have.value', 'Blablabla');
    cy.get('button.search__button--header')
      .first()
      .click(); 
    cy.url().should('include', '/search?q=Blablabla');
    cy.get('#results-product-list-1').should('not.be.visible');
    cy.get('alert--warning').should('be.visible').and('have.text', 'No results found for “Blablabla”. Check the spelling or use a different word or phrase.')
  });

  it('submits a search request with ENTER key', () => {
    cy.get('#Search-In-Inline')
      .should('be.visible')
      .type('Dummy Handle{enter}')
    cy.url().should('include', '/search?q=Dummy+Handle');
  });

  it('checks that search is case insensitive', () => {
    cy.get('#Search-In-Inline')
      .should('be.visible')
      .type('duMMY HanDlE')
      .should('have.value', 'duMMY HanDlE');
    cy.get('button.search__button--header')
      .first()
      .click(); 
    cy.url().should('include', '/search?q=duMMY+HanDlE');
    cy.get('#results-product-list-1').should('be.visible');
    cy.get('#results-product-list-1 ul > li')
      .first()
      .find('a.card__heading__product-title')
      .first()
      .should('contain.text', 'Dummy Handle');
  });
});