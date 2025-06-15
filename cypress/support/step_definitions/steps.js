import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// URLs base
const URL_LOGIN = "https://www.automationexercise.com/login";
const URL_HOME = "https://www.automationexercise.com";
const URL_PRODUTOS = "https://www.automationexercise.com/products";

// Dados do usuário
const USUARIO_EMAIL_VALIDO = "thiago.qa.fernandes@gmail.com";
const USUARIO_SENHA = "teste123";
const EMAIL_INVALIDO = "teste@123.com.br";
const SENHA_INVALIDA = "123456";



// ----------------------
// Cenário: Login Válido
// ----------------------
Given("que o usuário acessa a página de Login", () => {
    cy.visit(URL_HOME);
    cy.contains("a", "Login").click();
});

When("ele insere email e senha corretos", () => {
    cy.get('[data-qa="login-email"]').type(USUARIO_EMAIL_VALIDO);
    cy.get('[data-qa="login-password"]').type(USUARIO_SENHA);
    cy.get('[data-qa="login-button"]').click();
});

Then("ele deve acessar a página da conta", () => {
    cy.contains("Logged in as").should("be.visible");
});



// -------------------------
// Cenário: Login email Inválido
// -------------------------
Given("que o usuário acessa a diretamente a URL de Login", () => {
    cy.visit(URL_LOGIN);
});

When("inserir um email invalido e senha valida", () => {
    cy.get('[data-qa="login-email"]').type(EMAIL_INVALIDO);
    cy.get('[data-qa="login-password"]').type(USUARIO_SENHA);
    cy.get('[data-qa="login-button"]').click();
});

Then("não acessa a pagina da conta e aparece uma mensagem de erro", () => {
    cy.contains("Your email or password is incorrect!").should("be.visible");
});



// -------------------------
// Cenário: Login senha Inválida
// -------------------------
Given("que ao acessar a URL de login de forma direta", () => {
    cy.visit(URL_LOGIN);
});

When("digitar um email valido com senha invalidos", () => {
    cy.get('[data-qa="login-email"]').type(USUARIO_EMAIL_VALIDO);
    cy.get('[data-qa="login-password"]').type(SENHA_INVALIDA);
    cy.get('[data-qa="login-button"]').click();
});

Then("ele não acessa a pagina da conta e aparece uma mensagem de erro", () => {
    cy.contains("Your email or password is incorrect!").should("be.visible");
});



// -------------------------
// Cenário: Login com campos vazios
// -------------------------
Given("que o usuario esta na tela de login", () => {
    cy.visit(URL_LOGIN);
});

When("ele tenta logar sem preencher email e senha", () => {
    cy.get('[data-qa="login-email"]').focus().blur();
    cy.get('[data-qa="login-password"]').focus().blur();
    cy.get('[data-qa="login-button"]').click();
});

Then("o navegador deve solicitar o preenchimento dos campos", () => {
    cy.get('[data-qa="login-email"]').then(($el) => {
        expect($el[0].validationMessage).to.contain("Preencha este campo");
    });
});



// ----------------------------------
// Cenário: Acessar aba de Produtos
// ----------------------------------
Given("que o usuário está na página inicial", () => {
    cy.visit(URL_LOGIN);
});

When("selecionar a opção de Produtos", () => {
    cy.contains("a", "Products").click();
});

Then("o sistema deve exibir a tela de produtos", () => {
    cy.get('#search_product').type('POLO');
});



// ------------------------
// Cenário: Buscar produto
// ------------------------
Given("que o usuário está na página de Produtos", () => {
    cy.visit(URL_PRODUTOS);
});

When("buscar por {string}", (produto) => {
    cy.get('#search_product').type(produto);
    cy.get('#submit_search').click();
});

Then("o sistema deve exibir os produtos relacionados", () => {
    cy.get('.productinfo.text-center').should('be.visible');
});



// ------------------------------------
// Cenário: Adicionar produto ao carrinho
// ------------------------------------
Given("que o usuário buscou por {string}", (produto) => {
    cy.visit(URL_LOGIN);
    cy.contains("a", "Products").click();
    cy.get('#search_product').type(produto);
    cy.get('#submit_search').click();
});

When("ele adiciona os primeiros produtos ao carrinho", () => {
    cy.get('.product-overlay').first().invoke('show');
    cy.get('.add-to-cart').first().click();
    cy.contains('Continue Shopping').click();
    cy.contains('Madame Top For Women').should('be.visible');
    cy.get('[data-product-id="7"]').first().click({ force: true });
    cy.contains('Continue Shopping').click();
    cy.contains('Cart').click();
});

Then("o produto deve aparecer no resumo do carrinho", () => {
    cy.contains('Madame Top For Women').should('be.visible');
    cy.get('.cart_info').should('contain.text', 'Madame Top For Women');
});



// ------------------------------------
// Cenário: Remover os produto do carrinho
// ------------------------------------
Given("que adiciona os primeiros produtos ao carrinho", () => {
    cy.visit(URL_PRODUTOS);
    cy.get('#search_product').type('POLO');
    cy.get('#submit_search').click();

    cy.get('.productinfo.text-center').should('exist');

    cy.get('.productinfo.text-center').first().trigger('mouseover');
    cy.get('.product-overlay').first().invoke('show');
    cy.get('.add-to-cart').first().click({ force: true });
    cy.contains('Continue Shopping').click();

    cy.contains('Cart').click();
});

When("ele deseja excluir todos os itens do carrinho", () => {
    cy.get('.cart_quantity_delete').each(($el) => {
        cy.wrap($el).click({ force: true });
    });
});

Then("o carrinho deve ser exibido vazio", () => {
    cy.get('#cart_info tr').not('.cart_menu').should('have.length', 0);
    cy.contains('Cart is empty').should('be.visible');
});



// --------------------------------------
// Cenário: Verificar produto no checkout
// --------------------------------------
Given("que o usuario selecionou o produto no carrinho", () => {
    cy.visit(URL_LOGIN);
    cy.contains("a", "Products").click();
    cy.get('#search_product').type('POLO');
    cy.get('#submit_search').click();
    cy.get('.product-overlay').first().invoke('show');
    cy.get('.add-to-cart').first().click();
    cy.contains('Continue Shopping').click();
    cy.contains('Cart').click();
});

When("o usuário acessar a area de checkout", () => {
    cy.get('.btn.check_out').click({ force: true });
});

Then("o produto deve aparecer na tela de pagamento", () => {
    cy.contains('Polo').should('exist');
});
