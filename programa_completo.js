/**
 * ===================================================================================
 * IMPORTAÇÃO E CONFIGURAÇÃO INICIAL
 * ===================================================================================
 * Para que o programa possa ler a entrada do usuário no console de forma interativa,
 * utilizamos a biblioteca externa 'prompt-sync'.
 * A linha abaixo inicializa a biblioteca e a torna pronta para uso.
 */
const prompt = require('prompt-sync')({ sigint: true });

/**
 * ===================================================================================
 * FUNÇÃO 1: CLASSIFICADOR DE NADADOR (Uso de Condicionais)
 * ===================================================================================
 * Esta função utiliza uma estrutura de 'if-else if-else' para resolver o problema.
 * - ESTRUTURA CONDICIONAL: É ideal aqui porque as categorias de idade são
 * mutuamente exclusivas. O programa verifica cada condição em sequência e, ao
 * encontrar a primeira que seja verdadeira, executa o bloco correspondente e ignora
 * as demais.
 * - parseInt(): Converte a entrada do usuário (que é sempre texto) em um número inteiro.
 * - !isNaN(): É uma verificação para garantir que o usuário digitou um número válido.
 */
function classificarNadador() {
  console.log("\n--- [Opção 1] Classificador de Categoria para Nadadores ---");
  const idade = parseInt(prompt("Digite a idade do nadador: "));

  if (!isNaN(idade)) {
    let categoria;
    if (idade >= 5 && idade <= 7) {
      categoria = "Infantil A";
    } else if (idade >= 8 && idade <= 10) {
      categoria = "Infantil B";
    } else if (idade >= 11 && idade <= 13) {
      categoria = "Juvenil A";
    } else if (idade >= 14 && idade <= 17) {
      categoria = "Juvenil B";
    } else if (idade >= 18) {
      categoria = "Adulto";
    } else {
      categoria = "Não se enquadra em nenhuma categoria (muito jovem)";
    }
    console.log(`Com ${idade} anos, o nadador pertence à categoria: ${categoria}`);
  } else {
    console.log("Entrada inválida. Por favor, digite um número.");
  }
}

/**
 * ===================================================================================
 * FUNÇÃO 2: CALCULADORA DE MÉDIAS (Uso de Funções e Switch)
 * ===================================================================================
 * Esta função demonstra como chamar outras funções e usar a estrutura 'switch'.
 * - FUNÇÕES: O cálculo de cada média está encapsulado em sua própria função,
 * promovendo a reutilização e organização do código.
 * - SWITCH: É uma alternativa mais limpa ao 'if-else if' quando temos uma única
 * variável para comparar com múltiplos valores possíveis (no caso, a 'opcao').
 * - parseFloat(): Usado para ler as notas, permitindo valores decimais.
 */
function calcularMedias() {
  console.log("\n--- [Opção 2] Calculadora de Médias ---");
  const n1 = parseFloat(prompt("Digite a primeira nota: "));
  const n2 = parseFloat(prompt("Digite a segunda nota: "));
  const n3 = parseFloat(prompt("Digite a terceira nota: "));

  if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
    console.log("Uma ou mais notas são inválidas. Tente novamente.");
    return;
  }

  console.log("\nEscolha o tipo de média:");
  console.log("1 - Aritmética");
  console.log("2 - Ponderada (pesos 3, 3, 4)");
  console.log("3 - Harmônica");
  const opcao = prompt("Digite a opção desejada: ");

  let media;
  switch (opcao) {
    case '1':
      media = (n1 + n2 + n3) / 3;
      console.log(`A Média Aritmética é: ${media.toFixed(2)}`);
      break;
    case '2':
      media = (n1 * 3 + n2 * 3 + n3 * 4) / 10;
      console.log(`A Média Ponderada é: ${media.toFixed(2)}`);
      break;
    case '3':
      if (n1 === 0 || n2 === 0 || n3 === 0) {
        console.log("ERRO: Não é possível calcular a média harmônica com nota zero.");
      } else {
        media = 3 / (1 / n1 + 1 / n2 + 1 / n3);
        console.log(`A Média Harmônica é: ${media.toFixed(2)}`);
      }
      break;
    default:
      console.log("Opção inválida.");
      break;
  }
}

/**
 * ===================================================================================
 * FUNÇÃO 3: CÁLCULO DE CRÉDITO ESPECIAL (Uso de Condicionais)
 * ===================================================================================
 * Similar à função 1, esta usa 'if-else if-else' para determinar um percentual
 * com base em faixas de valores numéricos (o saldo médio).
 * - toFixed(2): Formata um número para ter exatamente duas casas decimais, ideal
 * para valores monetários.
 */
function calcularCreditoEspecial() {
  console.log("\n--- [Opção 3] Cálculo de Crédito Especial ---");
  const saldoMedio = parseFloat(prompt("Digite o saldo médio do último ano: R$ "));

  if (!isNaN(saldoMedio)) {
    let percentual;
    if (saldoMedio >= 0 && saldoMedio <= 200) {
      percentual = 0;
    } else if (saldoMedio >= 201 && saldoMedio <= 400) {
      percentual = 0.20; // 20%
    } else if (saldoMedio >= 401 && saldoMedio <= 600) {
      percentual = 0.30; // 30%
    } else { // Acima de 601
      percentual = 0.40; // 40%
    }

    const valorCredito = saldoMedio * percentual;

    console.log(`\nSaldo Médio: R$ ${saldoMedio.toFixed(2)}`);
    if (valorCredito > 0) {
      console.log(`Valor do Crédito: R$ ${valorCredito.toFixed(2)} (${percentual * 100}%)`);
    } else {
      console.log("Valor do Crédito: Nenhum crédito disponível para esta faixa de saldo.");
    }
  } else {
    console.log("Entrada inválida. Por favor, digite um número.");
  }
}

/**
 * ===================================================================================
 * FUNÇÃO 4: PREÇO TOTAL DE PRODUTO (Uso de Array e Matriz/Estrutura de Dados)
 * ===================================================================================
 * Esta função demonstra como usar uma estrutura de dados para armazenar
 * informações relacionadas (código e preço).
 * - ARRAY DE ARRAYS (MATRIZ): A variável 'produtos' é uma matriz onde cada linha
 * contém os dados de um produto: [código, preço]. Isso organiza a informação.
 * - ESTRUTURA DE REPETIÇÃO ('for...of'): O laço percorre cada 'produto' (linha)
 * na nossa matriz 'produtos' para encontrar o código correspondente. É uma
 * forma moderna e legível de iterar sobre arrays.
 */
function calcularPrecoTotal() {
  console.log("\n--- [Opção 4] Cálculo de Preço Total por Produto ---");
  
  // Usamos uma estrutura similar a uma matriz para guardar a tabela de produtos.
  // Cada item do array é outro array no formato [código, preço].
  const produtos = [
    [5, 32.00],
    [6, 45.00],
    [2, 37.00]
  ];

  console.log("Produtos disponíveis:");
  // ESTRUTURA DE REPETIÇÃO (forEach) para exibir os produtos
  produtos.forEach(produto => {
    console.log(`- Código: ${produto[0]}, Preço: R$ ${produto[1].toFixed(2)}`);
  });

  const codigo = parseInt(prompt("Digite o código do produto: "));
  const quantidade = parseInt(prompt("Digite a quantidade comprada: "));

  if (isNaN(codigo) || isNaN(quantidade)) {
    console.log("Código ou quantidade inválida.");
    return;
  }

  let precoUnitario = 0;
  let produtoEncontrado = false;

  // ESTRUTURA DE REPETIÇÃO (for...of) para buscar o preço
  for (const produto of produtos) {
    if (produto[0] === codigo) {
      precoUnitario = produto[1];
      produtoEncontrado = true;
      break; // Interrompe o laço assim que encontra o produto
    }
  }

  if (produtoEncontrado) {
    const precoTotal = precoUnitario * quantidade;
    console.log(`Preço total a pagar: R$ ${precoTotal.toFixed(2)}`);
  } else {
    console.log("Código do produto não encontrado.");
  }
}

/**
 * ===================================================================================
 * FUNÇÃO 5: CÁLCULO DE AUMENTO SALARIAL (Uso de Switch com Default)
 * ===================================================================================
 * Esta função usa 'switch' de forma eficaz, incluindo o caso 'default'.
 * - DEFAULT: O bloco 'default' do switch é executado se a variável (cargo) não
 * corresponder a nenhum dos 'cases' anteriores. Isso é perfeito para a regra
 * dos "outros cargos" que recebem 40% de aumento.
 */
function calcularAumentoSalario() {
  console.log("\n--- [Opção 5] Cálculo de Aumento Salarial por Cargo ---");
  const salarioAtual = parseFloat(prompt("Digite o salário atual do funcionário: R$ "));
  const codigoCargo = prompt("Digite o código do cargo (101 (Gerente), 102, 103, ou outro): ");

  if (isNaN(salarioAtual)) {
    console.log("Salário inválido.");
    return;
  }

  let percentualAumento;
  switch (codigoCargo) {
    case '101': // Gerente
      percentualAumento = 0.10; // 10%
      break;
    case '102': // Engenheiro
      percentualAumento = 0.20; // 20%
      break;
    case '103': // Técnico
      percentualAumento = 0.30; // 30%
      break;
    default: // Outros cargos
      percentualAumento = 0.40; // 40%
      break;
  }

  const aumento = salarioAtual * percentualAumento;
  const novoSalario = salarioAtual + aumento;

  console.log(`\nSalário Antigo: R$ ${salarioAtual.toFixed(2)}`);
  console.log(`Novo Salário: R$ ${novoSalario.toFixed(2)}`);
  console.log(`Diferença (Aumento): R$ ${aumento.toFixed(2)}`);
}


/**
 * ===================================================================================
 * MENU PRINCIPAL (Controlador do Programa)
 * ===================================================================================
 * Esta função controla todo o fluxo do programa.
 * - ESTRUTURA DE REPETIÇÃO ('do...while'): Garante que o menu seja exibido pelo
 * menos uma vez e continue aparecendo até que o usuário escolha a opção de sair ('0').
 * - FUNÇÕES: O menu apenas chama as funções responsáveis por cada tarefa, mantendo
 * o código principal limpo e organizado.
 */
function menuPrincipal() {
  let opcao;

  do {
    console.log("\n================ MENU PRINCIPAL ================");
    console.log("1. Classificar Nadador por Idade");
    console.log("2. Calcular Média de Notas");
    console.log("3. Calcular Crédito Especial do Banco");
    console.log("4. Calcular Preço Total de Venda");
    console.log("5. Calcular Aumento Salarial");
    console.log("0. Sair do Programa");
    console.log("==============================================");

    opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
      case '1':
        classificarNadador();
        break;
      case '2':
        calcularMedias();
        break;
      case '3':
        calcularCreditoEspecial();
        break;
      case '4':
        calcularPrecoTotal();
        break;
      case '5':
        calcularAumentoSalario();
        break;
      case '0':
        console.log("Saindo do programa. Até logo!");
        break;
      default:
        console.log("Opção inválida! Por favor, escolha uma das opções do menu.");
        break;
    }
    
    // Pequena pausa para melhorar a experiência do usuário antes de limpar o console
    if (opcao !== '0') {
        prompt("\nPressione Enter para continuar...");
    }

  } while (opcao !== '0');
}

// --- Inicia a execução do programa chamando o menu principal ---
menuPrincipal();