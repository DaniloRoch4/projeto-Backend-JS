const prompt = require('prompt-sync')({ sigint: true });

// 1. Classe Aluno 
class Aluno {
  constructor(nome) {
    // Propriedades iniciais do aluno
    this.nome = nome;
    this.nivelHabilidade = 'iniciante'; 
    this.quantidadeAulas = 0; 
  }

  // Método para checar e atualizar o nível baseado nas aulas realizadas.
  atualizarNivel() {
    let nivelAtualizado = false;
    // Usa uma estrutura 'switch (true)' para verificar múltiplas condições.
    switch (true) {
      // Se 10 ou mais aulas E for iniciante, avança para intermediário.
      case this.quantidadeAulas >= 10 && this.nivelHabilidade === 'iniciante':
        this.nivelHabilidade = 'intermediário';
        nivelAtualizado = true;
        break;
      // Se 25 ou mais aulas E for intermediário, avança para avançado.
      case this.quantidadeAulas >= 25 && this.nivelHabilidade === 'intermediário':
        this.nivelHabilidade = 'avançado';
        nivelAtualizado = true;
        break;
    }
    // Exibe a mensagem de atualização, se houver.
    if (nivelAtualizado) {
        console.log(`\n ${this.nome} atingiu o nível ${this.nivelHabilidade.toUpperCase()}!`);
    }
  }

  // Método para determinar a aptidão para o exame prático.
  estaAptoParaExame() {
    // Critério: 40+ aulas E nível avançado.
    return this.quantidadeAulas >= 40 && this.nivelHabilidade === 'avançado';
  }

  // Método para formatar a saída do progresso.
  mostrarProgresso() {
    let statusExame = this.estaAptoParaExame() ? 'APTO' : 'NÃO APTO';
    return `
    --- PROCESSO DE ${this.nome.toUpperCase()} ---
    Nível de Habilidade: ${this.nivelHabilidade}
    Aulas Práticas: ${this.quantidadeAulas}
    Status para Exame Prático: ${statusExame} ${icone}
    `;
  }
}

// 2. Classe EscolaDirecao (Gerencia os alunos e as operações)
class EscolaDirecao {
  constructor() {
    // Array para armazenar todas as instâncias de Aluno.
    this.alunos = []; // Estrutura de dados principal.
  }

  // Método auxiliar para encontrar um aluno pelo nome, ignorando maiúsculas/minúsculas.
  encontrarAluno(nome) {
    return this.alunos.find(aluno => aluno.nome.toLowerCase() === nome.toLowerCase());
  }

  // Método para adicionar um novo aluno (Cadastro).
  matricularAluno(nome) {
    if (this.encontrarAluno(nome)) {
      console.log(`\n Erro: O aluno(a) ${nome} já está matriculado(a).`);
      return;
    }
    // Cria uma nova instância de Aluno.
    const novoAluno = new Aluno(nome);
    // Adiciona a instância ao array.
    this.alunos.push(novoAluno);
    console.log(`\n ${nome} matriculado(a) com sucesso! Nível inicial: ${novoAluno.nivelHabilidade}.`);
  }

  // Método para simular a conclusão de uma aula (Avanço no Progresso).
  registrarAula(nomeAluno) {
    const aluno = this.encontrarAluno(nomeAluno);
    if (aluno) {
      aluno.quantidadeAulas++; // Incrementa o contador de aulas.
      aluno.atualizarNivel(); // Chama o método para checar a promoção de nível.
      console.log(`\n Aula registrada para ${aluno.nome}. Aulas totais: ${aluno.quantidadeAulas}`);
    } else {
      console.log(`\n Erro: Aluno(a) "${nomeAluno}" não encontrado(a). Verifique o nome.`);
    }
  }

  // Método para consultar o progresso de um aluno (Consulta).
  consultarProgresso(nomeAluno) {
    const aluno = this.encontrarAluno(nomeAluno);
    if (aluno) {
      console.log(aluno.mostrarProgresso());
    } else {
      console.log(`\n Erro: Aluno(a) "${nomeAluno}" não encontrado(a). Verifique o nome.`);
    }
  }

  listarAlunos() {
    // Verifica se há alunos cadastrados.
    if (this.alunos.length === 0) {
      console.log('\nNenhum aluno cadastrado na escola ainda.');
      return;
    }

    console.log('\n--- LISTA DE ALUNOS CADASTRADOS ---');
    // O método 'forEach' itera sobre cada item do array 'alunos'.
    this.alunos.forEach((aluno, index) => {
      const apto = aluno.estaAptoParaExame() ? 'SIM' : 'NÃO';
      // Usa template literals para formatar a saída de forma legível.
      console.log(
        `${index + 1}. Nome: ${aluno.nome}`.padEnd(30) + 
        `| Nível: ${aluno.nivelHabilidade}`.padEnd(20) + 
        `| Aulas: ${String(aluno.quantidadeAulas).padEnd(2)}` +
        `| Apto Exame: ${apto}`
      );
    });
    console.log('-----------------------------------');
  }   
}

// --- LÓGICA DO MENU PRINCIPAL ---

// Instância única da nossa escola de direção.
const autoEscola = new EscolaDirecao();

function cadastrarAluno() {
    // O método prompt() recebe a pergunta e retorna diretamente a resposta do usuário.
    const nome = prompt('Informe o NOME completo do novo aluno: ').trim(); 
    
    // Validação de entrada
    if (nome === '') {
        console.log('\nNome não pode ser vazio. Operação cancelada.');
        return;
    }
    autoEscola.matricularAluno(nome);
}

function registrarAula() {
    const nome = prompt('Informe o NOME do aluno para registrar a aula: ').trim();
    
    if (nome === '') {
        console.log('\nNome não pode ser vazio. Operação cancelada.');
        return;
    }
    // Transfere a responsabilidade para a classe EscolaDirecao.
    autoEscola.registrarAula(nome);
}

function consultarProgresso() {
    const nome = prompt('Informe o NOME do aluno para CONSULTAR o progresso: ').trim();
    
    if (nome === '') {
        console.log('\nNome não pode ser vazio. Operação cancelada.');
        return;
    }
    autoEscola.consultarProgresso(nome);
}

// Função que chama o novo método de listagem.
function listarAlunosCadastrados() {
    // A responsabilidade de listar e formatar a saída é totalmente da classe EscolaDirecao.
    autoEscola.listarAlunos();
}
 

// Função principal de loop do programa.
function iniciarSistema() {
  let rodando = true;

  // O loop 'while' mantém o menu ativo até que o usuário escolha a opção 'Sair'.
  while (rodando) {
    console.log('\n=============================================');
    console.log('PROJETO PILOTO - ESCOLA DE DIREÇÃO');
    console.log('=============================================');
    console.log('1. Cadastrar Novo Aluno');
    console.log('2. Registrar Conclusão de Aula');
    console.log('3. Consultar Progresso do Aluno');
    console.log('4. Listar Todos os Alunos Cadastrados');
    console.log('5. Sair');
    console.log('---------------------------------------------');

    // O prompt é síncrono, armazena a resposta em 'opcao' antes de continuar.
    const opcao = prompt('Escolha uma opção (1-5): ').trim();

    switch (opcao) {
      case '1':
        cadastrarAluno();
        break;
      case '2':
        registrarAula();
        break;
      case '3':
        consultarProgresso();
        break;
      case '4': 
        listarAlunosCadastrados();
        break;
      case '5':
        console.log('\nObrigado por usar o sistema! Encerrando...');
        rodando = false; // Define a flag como false para sair do loop 'while'.
        break;
      default:
        console.log('\n Opção inválida. Por favor, escolha um número entre 1 e 4.');
        break;
    }
  }
}

// Inicia a execução do programa.
iniciarSistema();