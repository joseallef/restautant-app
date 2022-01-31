/// <reference types="cypress" />

describe('/app/login/', () => {
  it('preencha os campos e click em enviar e após mande para a pagina cardapio', () => {

    // acessa a página de login
    cy.visit('/');


    // Preencher o campo usuario
    cy.get('input[name="user"]').type('teste@gmail.com');


    // Preencher o campo senha
    cy.get('input[name="password"]').type('102030');


    // Clicar em login
    cy.get('button[type="submit"]').click();


    cy.url().should('include', '/app/login/');


  })
})