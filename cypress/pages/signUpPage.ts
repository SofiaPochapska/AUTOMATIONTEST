import Utils from '../support/utils'

class SignUpPage {
  // Locators (private, so tests don’t use them directly)
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

  // Actions (public methods, used in tests)
  enterFullName(name: string) {
    Utils.typeValue(this.elements.fullName(), name);
  }

  enterEmail(email:string) {
    Utils.typeValue(this.elements.email(), email);
  }

  enterPassword(password: string) {
    Utils.typeValue(this.elements.password(), password);
  }

  enterConfirmPassword(password: string) {
    Utils.typeValue(this.elements.confirmPassword(), password);
  }

  selectCurrency(currency: string) {
    Utils.selectValue(this.elements.currencyDropdown(), currency);
  }

  clickSignUp() {
    Utils.clickElement(this.elements.signUpButton(), 'Sign Up button');
  }

  clickLogIn() {
    Utils.clickElement(this.elements.logInButton(), 'Log In button');
  }

  getErrorForField(field: string) {
    return this.elements.error(field);
  }
}

export default new SignUpPage();
