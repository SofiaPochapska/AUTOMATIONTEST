import signUpPage from '../pages/signUpPage';

describe('Sign Up', () => {

  const testName = 'Britney Beach'
  const testEmail = 'test@test.com'
  const testPassword = 'Passw0rd'
  const extraPassword = 'Qwerty01@'

  beforeEach(() => {
    cy.visit('https://finmore.netlify.app/');
    cy.url().should('eq', 'https://finmore.netlify.app/');
    cy.get('[data-testid="switch-to-register-button"]')
      .should('be.visible')
      .click();
    cy.get('[data-testid="register-title"]')
      .should('be.visible')
      .and('have.text', 'Реєстрація');
  });

    it('successfully registers user with default UAH currency', () => {
        signUpPage.enterFullName(testName);
        signUpPage.enterEmail(testEmail);
        signUpPage.enterPassword(testPassword);
        signUpPage.enterConfirmPassword(testPassword);
        signUpPage.clickSignUp();
        cy.get('[data-testid="app-title"]')
          .first()
          .should('be.visible')
          .and('have.text', 'FinanceManager');
    });

    it('successfully registers user with USD currency', () => {
        signUpPage.enterFullName(testName);
        signUpPage.enterEmail(testEmail);
        signUpPage.enterPassword(testPassword);
        signUpPage.enterConfirmPassword(testPassword);
        // signUpPage.openCurrencyDropdown();
        signUpPage.selectCurrency('USD');
        signUpPage.clickSignUp();
        cy.get('[data-testid="app-title"]')
          .first()
          .should('be.visible')
          .and('have.text', 'FinanceManager');
    });

    it('successfully registers user with EUR currency', () => {
        signUpPage.enterFullName(testName);
        signUpPage.enterEmail(testEmail);
        signUpPage.enterPassword(testPassword);
        signUpPage.enterConfirmPassword(testPassword);
        // signUpPage.openCurrencyDropdown();
        signUpPage.selectCurrency('EUR');
        signUpPage.clickSignUp();
        cy.get('[data-testid="app-title"]')
          .first()
          .should('be.visible')
          .and('have.text', 'FinanceManager');
    });

    it('successfully registers user with GBP currency', () => {
        signUpPage.enterFullName(testName);
        signUpPage.enterEmail(testEmail);
        signUpPage.enterPassword(testPassword);
        signUpPage.enterConfirmPassword(testPassword);
        // signUpPage.openCurrencyDropdown();
        signUpPage.selectCurrency('GBP');
        signUpPage.clickSignUp();
        cy.get('[data-testid="app-title"]')
          .first()
          .should('be.visible')
          .and('have.text', 'FinanceManager');
    });

    it('fails to register user with no name', () => {
        signUpPage.enterEmail(testEmail);
        signUpPage.enterPassword(testPassword);
        signUpPage.enterConfirmPassword(testPassword);
        signUpPage.clickSignUp();
        signUpPage.getErrorForField('name').should('contain', "Ім'я обов'язкове");
        cy.get('[data-testid="app-title"]')
          .should('not.exist');
    });

    it('fails to register user with no email', () => {
        signUpPage.enterFullName(testName);
        signUpPage.enterPassword(testPassword);
        signUpPage.enterConfirmPassword(testPassword);
        signUpPage.clickSignUp();
        signUpPage.getErrorForField('email').should('contain', "Email обов'язковий");
        cy.get('[data-testid="app-title"]')
          .should('not.exist');
    });

    it('fails to register user with invalid email', () => {
        signUpPage.enterFullName(testName);
        signUpPage.enterPassword(testPassword);
        signUpPage.enterConfirmPassword(testPassword);
        signUpPage.clickSignUp();
        signUpPage.getErrorForField('email').should('contain', "Email обов'язковий");
        cy.get('[data-testid="app-title"]')
          .should('not.exist');
    });

    it('fails to register user with no password', () => {
        signUpPage.enterFullName(testName);
        signUpPage.enterEmail(testEmail);
        signUpPage.enterConfirmPassword(testPassword);
        signUpPage.clickSignUp();
        signUpPage.getErrorForField('password').should('contain', "Пароль обов'язковий");
        cy.get('[data-testid="app-title"]')
          .should('not.exist');
    });

    it('fails to register user with no confirm password', () => {
        signUpPage.enterFullName(testName);
        signUpPage.enterEmail(testEmail);
        signUpPage.enterPassword(testPassword);
        signUpPage.clickSignUp();
        signUpPage.getErrorForField('confirm-password').should('contain', "Підтвердження паролю обов'язкове");
        cy.get('[data-testid="app-title"]')
          .should('not.exist');
    });

    it('fails to register user when password and confirm password do not match', () => {
        signUpPage.enterFullName(testName);
        signUpPage.enterEmail(testEmail);
        signUpPage.enterPassword(testPassword);
        signUpPage.enterConfirmPassword(extraPassword);
        signUpPage.clickSignUp();
        signUpPage.getErrorForField('confirm-password').should('contain', "Паролі не співпадають");
        cy.get('[data-testid="app-title"]')
          .should('not.exist');
    });

    it('redirects user to the login page', () => {
        signUpPage.clickLogIn();
        cy.get('data-testid="login-title"')
          .should('be.visible');
    });
})