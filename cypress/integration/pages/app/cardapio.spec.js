/// <reference types="cypress" />

describe('/pages/app/cadastro/', () => {
  it('va para a pagina de cadastro', () => {
    cy.visit('/app/cardapio');
    cy.get('main div form section[0] option[value="0"]').type('3');
  })
});
