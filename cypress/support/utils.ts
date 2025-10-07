class Utils {
  typeValue(element: Cypress.Chainable<JQuery<HTMLElement>>, value: string) {
    element.clear().type(value);
    cy.log(`Typed value: "${value}"`);
  }

  clickElement(element: Cypress.Chainable<JQuery<HTMLElement>>, description?: string) {
    element.click();
    if (description) {
      cy.log(`Clicked: ${description}`);
    }
  }

  selectValue(element: Cypress.Chainable<JQuery<HTMLElement>>, value: string) {
    element.select(value);
    cy.log(`Selected value: "${value}"`);
  }
}

export default new Utils();
