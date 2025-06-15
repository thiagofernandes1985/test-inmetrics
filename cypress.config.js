const { defineConfig } = require("cypress");

// Pré-processadores para suporte ao Cucumber e ESBuild
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

module.exports = defineConfig({
  e2e: {
     /**
     * Define onde estão localizados os arquivos de teste com a extensão `.feature`.
     * Aqui informamos que os arquivos estão dentro de `cypress/e2e/`, seguindo a estrutura de Features do Cucumber.
     */
    //specPattern: "cypress/**/*.cy.{js,jsx,ts,tsx}",
    specPattern: "cypress/e2e/**/*.feature",

      /**
     * Desativa o arquivo de suporte padrão (ex: cypress/support/e2e.js).
     * Caso queira usar o arquivo de suporte, defina o caminho ou remova essa linha.
     */
    supportFile: false, // Desativa arquivo de suporte padrão

    /**
     * Função de configuração dos eventos do Node, executada no início dos testes.
     */
    async setupNodeEvents(on, config) {
      // Ativa o plugin do Cucumber para Cypress
      await addCucumberPreprocessorPlugin(on, config);

      // Define o bundler usando o plugin do ESBuild (mais rápido que o Webpack)
      on("file:preprocessor", createBundler({ plugins: [createEsbuildPlugin(config)] }));

      // Retorna a configuração final
      return config;
    },
  },
});



