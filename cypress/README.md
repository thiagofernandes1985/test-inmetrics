# Teste Automatizado com Cypress - API Trello e Testes e2e #

*Este projeto contém testes automatizados utilizando **Cypress** para validar a API do Trello e funcionalidades end-to-end (e2e) do site [Automation Exercise] [https://www.automationexercise.com/].*

---
## Indice
- [Requisitos](#-requisitos)
- [Instalação do Projeto](#-instalação-do-projeto)
- [Configuração do Cypress](#️-configuração-do-cypress)
- [Executando os Testes](#-executando-os-testes)
- [Links úteis](#-links-úteis)
---
## 📦Requisitos

- [Node.js](https://nodejs.org/) (18.x ou superior recomendado) 
- npm (gerenciador de pacotes)
- Git (opcional)

---

## 🚀 Instalação do Projeto

```bash
git clone https://github.com/thiagofernandes1985/test-inmetrics

npm install
```

---

## ⚙️ Configuração do Cypress

- No arquivo ``cypress.config.js``, configure o ambiente e especifique os padrões de testes para API e e2e:

```bash

module.exports = defineConfig({
  e2e: {
    
    # Para rodar os testes de e2e comentar o API.
    # Para rodar os testes de API comentar o e2e.
    
    //specPattern: "cypress/**/*.cy.{js,jsx,ts,tsx}",
    specPattern: "cypress/e2e/**/*.feature",
    
)},
    
```

---

## 🧪 Executando os Testes

### Testes e2e (Interface do Automation Exercise)
```bash
npx cypress run --spec "cypress/e2e/features/automation.feature"
```
### Testes de API (Trello)
```bash
npx cypress run --spec "cypress/api/trello_api.cy.js"
```
### Executar Testes em modo GUI
```bash
npx cypress open
```
No UI, selecione os testes desejados nas pastas ``frontend`` ou ``api``.

## 📚 Links úteis

- [Cypress Documentation](https://docs.cypress.io/app/get-started/why-cypress)

- [API Trello - Documentação Oficial](https://trello.com/)

- [Site do Automation Exercise](https://www.automationexercise.com)

