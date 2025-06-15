describe('Desafio API - Trello', () => {
  it('Valida o status e exibe o nome da lista', () => {
    cy.request('https://api.trello.com/1/actions/592f11060f95a3d3d46a987a')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.list.name).to.be.a('string');
        cy.log("Nome da lista:", response.body.data.list.name);
      });
  });
});
