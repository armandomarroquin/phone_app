describe('PhoneApp', () => {
  it('should load the phone application', () => {
      cy.visit('/');
      cy.contains('Phone');
  });
});
