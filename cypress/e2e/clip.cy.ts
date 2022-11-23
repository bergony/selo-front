describe('Clip', () => {
  it('Should play clip', () => {
    cy.visit('/');
    cy.get('app-clips-list > .grid a:first').click();
    cy.get('.video-js').click({ force: true });
    cy.wait(10000);
    cy.get('.video-js').click({ force: true });
    cy.get('.vjs-play-progress').invoke('width').should('gte', 0);
  });
});
