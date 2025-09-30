class SignUpPage {
  // 1. Locators (private, so tests don’t use them directly)
  elements = {
    fullName: () => cy.get('[data-testid="register-name-input"]'),
    email: () => cy.get('[data-testid="register-email-input"]'),
    password: () => cy.get('[data-testid="register-password-input"]'),
    confirmPassword: () => cy.get('[data-testid="register-confirm-password-input"]'),
    currencyDropdown: () => cy.get('[data-testid="register-currency-select"]'),
    currencyOption: (currency: string) => cy.get(`[data-testid="currency-option-${currency}"]`),
    signUpButton: () => cy.get('[data-testid="register-submit-button"]'),
    logInButton: () => cy.get('[data-testid="switch-to-login-button"]'),
    error: (field: string) => cy.get(`[data-testid="${field}-error"]`) // one locator for fields with similar error structure
  };

  // 2. Actions (public methods, used in tests)
  enterFullName(name: string) {
    this.elements.fullName().type(name);
  }

  enterEmail(email: string) {
    this.elements.email().type(email);
  }

  enterPassword(password: string) {
    this.elements.password().type(password);
  }

  enterConfirmPassword(password: string) {
    this.elements.confirmPassword().type(password);
  }


  // openCurrencyDropdown() {
  //   this.elements.currencyDropdown().click(); // open the dropdown
  // }

selectCurrency(currency: string): void {
  this.elements.currencyDropdown().select(currency);
}

  clickSignUp() {
    this.elements.signUpButton().click();
  }

  clickLogIn() {
    this.elements.logInButton().click();
  }

getErrorForField(field: string) {
  return cy.get(`[data-testid="${field}-error"]`);
}
}

export default new SignUpPage();
