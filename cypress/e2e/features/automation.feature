Feature: Funcionalidades do site Automation Exercise

Scenario: Login Válido
    Given que o usuário acessa a página de Login
    When ele insere email e senha corretos
    Then ele deve acessar a página da conta

Scenario: Login email Inválido
    Given que o usuário acessa a diretamente a URL de Login
    When inserir um email invalido e senha valida
    Then não acessa a pagina da conta e aparece uma mensagem de erro

Scenario: Login senha Inválida
    Given que ao acessar a URL de login de forma direta
    When digitar um email valido com senha invalidos
    Then ele não acessa a pagina da conta e aparece uma mensagem de erro

Scenario: Login com campos vazios
    Given que o usuario esta na tela de login
    When ele tenta logar sem preencher email e senha
    Then o navegador deve solicitar o preenchimento dos campos

Scenario: Selecionar a aba de produtos
    Given que o usuário está na página inicial
    When selecionar a opção de Produtos
    Then o sistema deve exibir a tela de produtos 

Scenario: Buscar produto
    Given que o usuário está na página de Produtos
    When buscar por "POLO" 
    Then o sistema deve exibir os produtos relacionados 

Scenario: Adicionar produto ao carrinho
    Given que o usuário buscou por "men"
    When ele adiciona os primeiros produtos ao carrinho
    Then o produto deve aparecer no resumo do carrinho 

Scenario: Remover os produto do carrinho
    Given que adiciona os primeiros produtos ao carrinho
    When ele deseja excluir todos os itens do carrinho
    Then o carrinho deve ser exibido vazio     

Scenario: Verificar produto na tela de pagamento
    Given que o usuario selecionou o produto no carrinho
    When o usuário acessar a area de checkout 
    Then o produto deve aparecer na tela de pagamento 