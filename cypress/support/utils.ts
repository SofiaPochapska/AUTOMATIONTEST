class Utils {
  typeValue(element: any, value: string) {
    try {
      element.clear().type(value);
      cy.log(`Введено значення "${value}"`);
    } catch (error) {
      cy.log(`Помилка при введенні значення "${value}"`);
      throw error;
    }
  }
}