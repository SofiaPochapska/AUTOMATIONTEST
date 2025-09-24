describe('CONTACT US FORM', () => {
  const testName = 'QA'
  const testEmail = 'test@test.com'
  const testPhone = '12363023251'
  const testMessage = 'Hello world!'

  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', 'https://theconnectedshop.com/');
    cy.get('.header__inline-menu.small-hide.medium-hide li')
      .last()
      .should('exist')
      .click();
    cy.url().should('eq', 'https://theconnectedshop.com/pages/contact-us');
  });

    it('validates contact form UI elements', () => {
        cy.get('.title__heading.title__back.title__back--h0.font-heading-bold.margin0.lh1')
           .should('be.visible')
           .and('have.text', 'Contact Us');
        cy.get('.title__subtitle.margin0.title__front.h1.lh1')
           .should('be.visible')
           .and('have.text', 'Contact Us');
        cy.get('#ContactForm-email').should('be.visible');
        cy.get('#ContactForm-email').should('be.visible');
        cy.get('#ContactForm-phone').should('be.visible');
        cy.get('#ContactForm-body').should('be.visible');
        cy.get('.contact__button').should('be.visible').and('contain.text', 'Send');
    });

        it('successfully submits a form with all fields populated', () => {
        cy.get('#ContactForm-name').should('be.visible').type(testName);
        cy.get('#ContactForm-email').should('be.visible').type(testEmail);
        cy.get('#ContactForm-phone').should('be.visible').type(testPhone);
        cy.get('#ContactForm-body').should('be.visible').type(testMessage);
        cy.get('.contact__button .button').click();
        // cy.wait(3000);
        cy.get('.form__message.alert')
          .should('be.visible')
          .and('have.text', "Thanks for contacting us. We'll get back to you as soon as possible.");
        cy.url().should('eq', 'https://theconnectedshop.com/pages/contact-us?contact_posted=true#ContactForm');
    });


      it('successfully submits a form with no name populated', () => {
        cy.get('#ContactForm-email').should('be.visible').type(testEmail);
        cy.get('#ContactForm-phone').should('be.visible').type(testPhone);
        cy.get('#ContactForm-body').should('be.visible').type(testMessage);
        cy.get('.contact__button').click();
        cy.get('.form__message.alert')
          .should('be.visible')
          .and('have.text', "Thanks for contacting us. We'll get back to you as soon as possible.");
        cy.url().should('eq', 'https://theconnectedshop.com/pages/contact-us?contact_posted=true#ContactForm');
    });


      it('successfully submits a form with no phone number populated', () => {
        cy.get('#ContactForm-name').should('be.visible').type(testName);
        cy.get('#ContactForm-email').should('be.visible').type(testEmail);
        cy.get('#ContactForm-body').should('be.visible').type(testMessage);
        cy.get('.contact__button').click();
        cy.get('.form__message.alert')
          .should('be.visible')
          .and('have.text', "Thanks for contacting us. We'll get back to you as soon as possible.");
        cy.url().should('eq', 'https://theconnectedshop.com/pages/contact-us?contact_posted=true#ContactForm');
    });

        it('successfully submits a form with no comment', () => {
        cy.get('#ContactForm-name').should('be.visible').type(testName);
        cy.get('#ContactForm-email').should('be.visible').type(testEmail);
        cy.get('#ContactForm-phone').should('be.visible').type(testPhone);
        cy.get('.contact__button').click();
        cy.get('.form__message.alert')
          .should('be.visible')
          .and('have.text', "Thanks for contacting us. We'll get back to you as soon as possible.");
        cy.url().should('eq', 'https://theconnectedshop.com/pages/contact-us?contact_posted=true#ContactForm');
    });

    it('fails to submit a form with no email', () => {
        cy.get('#ContactForm-email').should('be.visible').type(testName);
        cy.get('#ContactForm-phone').should('be.visible').type(testPhone);
        cy.get('#ContactForm-body').should('be.visible').type(testMessage);
        cy.get('.contact__button').click();
        cy.get('#ContactForm')
          .should('have.attr', 'data-cptcha', 'true')
          .and('have.attr', 'data-hcaptcha-bound', 'true');
        cy.get('.form__message.alert')
          .should('not.exist');
        cy.url().should('eq', 'https://theconnectedshop.com/pages/contact-us');
    });
});