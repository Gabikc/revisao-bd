MODULES.push({
  id: 'a1', n: '1', acc: 'vio', src: 'Aula 1', short: 'Por que estudar BD',
  title: 'Apresentação e por que estudar banco de dados',
  blurb: 'Objetivos da disciplina, mapa da ementa e as ideias básicas que abrem todo o restante: dado, banco de dados e os principais tipos de SGBD.',
  topics: [
    { g: 'A disciplina', t: 'Objetivos de estudar banco de dados', h:
      `<p>Qualquer sistema de informação guarda e recupera dados. Por isso, BD é um conhecimento de base para a carreira em computação.</p>` +
      ul(['Compreender a relevância de bancos de dados como parte fundamental de aplicações do mundo real.',
        'Compreender os conceitos básicos sobre dados e os componentes de um BD.',
        'Aprender a criar soluções de BD eficazes para diferentes contextos.',
        'Aplicar os conceitos na criação, no gerenciamento e na manutenção de BDs.']) },
    { t: 'Ementa: o mapa do conteúdo', h:
      boxes([['Primeira metade: projetar', ul(['Introdução a bancos de dados', 'Sistemas gerenciadores de BD (SGBD)', 'Projeto de BD: conceitual, lógico e físico', 'Modelo conceitual de entidades e relacionamentos', 'Modelo de dados relacional', 'Normalização'])],
        ['Segunda metade: usar e otimizar', ul(['Álgebra relacional', 'SQL (Structured Query Language)', 'Restrições de integridade', 'Views, procedures e triggers', 'Organização física: armazenamento e indexação'])]]) +
      tip('As Aulas 2 a 5 deste site cobrem a primeira metade e a álgebra relacional. Quando a prova pedir “projeto de BD”, pense sempre em três camadas: conceitual, lógico e físico.') },
    { t: 'Projeto de BD: conceitual, lógico e físico', h:
      `<p>O projeto de um banco de dados avança em três níveis, cada um com seu produto.</p>` +
      boxes([['Conceitual', 'O <b>quê</b> guardar. Independe de SGBD. Produto: diagrama entidade-relacionamento (DER).'], ['Lógico', 'Como organizar em <b>tabelas</b>. Depende do modelo (relacional): chaves, relações, integridade.'], ['Físico', 'Como <b>armazenar</b>: arquivos, índices e técnicas de acesso no SGBD escolhido.']], 'grid3') +
      note('Este resumo por níveis vem da ementa. As Aulas 3 a 5 (prática) trabalham o nível conceitual; a Aula 5 (lógico) trabalha o lógico.') },
    { g: 'Como a disciplina funciona', t: 'Metodologia e avaliação', h:
      boxes([['Aulas', 'Expositivas com participação, atividades práticas em aula ou para entrega e projeto de implementação.'], ['Avaliação', 'Prova no papel, exercícios individuais e em grupo, implementação continuada com duas entregas (uma por módulo).'], ['Segunda chamada', 'Para quem ficou sem nota em um dos módulos. A nota substitui a de apenas um módulo.'], ['Aprovação', 'Média final na disciplina maior ou igual a 3,0.']]) },
    { t: 'Bibliografia principal', h:
      ul(['ELMASRI, R.; NAVATHE, S. B. <i>Sistemas de Banco de Dados: fundamentos e aplicações.</i>', 'SILBERSCHATZ, A.; KORTH, H. F.; SUDARSHAN, S. <i>Sistemas de Bancos de Dados.</i>', 'HEUSER, Carlos Alberto. <i>Projeto de Banco de Dados.</i> (base do mapeamento E-R para relacional na Aula 5)']) },
  ],
  examples: [
    { t: 'Onde há banco de dados no seu dia?', d: 'Toque em uma situação do cotidiano para ver que dados existem por trás dela.', mount(el) {
      const S = [
        ['Compra online', 'Clientes, produtos, pedidos, pagamentos, endereços de entrega.', 'Se pedido e estoque ficarem inconsistentes, você compra o que não existe.'],
        ['App do banco', 'Contas, clientes, transações, saldos, extratos.', 'Transferências precisam ser tudo ou nada (atomicidade).'],
        ['Streaming de vídeo', 'Usuários, catálogo, histórico de exibição, perfis.', 'Muitos usuários ao mesmo tempo exigem controle de concorrência.'],
        ['Prontuário médico', 'Pacientes, consultas, exames, internações, cirurgias.', 'Dado sensível: precisa de controle de acesso e segurança.'],
        ['Matrícula na faculdade', 'Alunos, disciplinas, turmas, notas, frequência.', 'Cada turma deve apontar para uma disciplina existente (integridade referencial).'],
        ['Rede social', 'Perfis, postagens, conexões entre pessoas, mensagens.', 'Muito volume e busca rápida: escolha do tipo de SGBD faz diferença.'],
      ];
      el.innerHTML = `<div class="ctrl" id="ch">${S.map((s, i) => `<button class="pick" data-i="${i}">${s[0]}</button>`).join('')}</div><div class="rel-out" id="out"><p>Escolha uma situação acima.</p></div>`;
      $$('#ch .pick', el).forEach((b) => b.onclick = () => { const s = S[+b.dataset.i]; $$('#ch .pick', el).forEach((x) => x.classList.toggle('ok', x === b)); $('#out', el).innerHTML = `<p><b>Dados guardados:</b> ${s[1]}</p><p><b>Por que importa:</b> ${s[2]}</p>`; });
    } },
  ],
  activities: [
    { t: 'Qual SGBD para qual necessidade?', d: 'Relacione cada necessidade ao SGBD que a atende melhor entre os vistos em aula.', kind: 'classify',
      cfg: { choices: ['MySQL', 'Redis', 'Snowflake', 'ElasticSearch'], items: [
        { t: 'Guardar dados em memória, como cache e fila de mensagens.', a: 1, why: 'Redis é em memória e do tipo chave-valor.' },
        { t: 'Sistema de cadastro tradicional, cliente-servidor, código aberto.', a: 0, why: 'MySQL é relacional, cliente-servidor e de código aberto (Oracle desde 2010).' },
        { t: 'Análise de dados em nuvem, big data em tempo real.', a: 2, why: 'Snowflake é voltado a análise de dados em nuvem.' },
        { t: 'Busca otimizada sobre dados armazenados em índices.', a: 3, why: 'ElasticSearch guarda dados em índices e otimiza a busca.' },
      ] } },
    { t: 'Perguntas de aquecimento', d: 'As perguntas da dinâmica da primeira aula. Pense na sua resposta e depois compare com a sugestão.', kind: 'qa', items: [
      ['No seu dia a dia, onde você usa bancos de dados?', '<p>Em quase tudo: redes sociais, aplicativos de banco, compras online, streaming, sistema da faculdade, prontuário médico, aplicativos de transporte.</p>'],
      ['Como os bancos de dados podem afetar sua vida?', '<p>Decidem o que aparece para você (recomendações), se um cadastro é aprovado, quais dados pessoais ficam guardados e por quanto tempo. Dado errado ou vazado vira problema real.</p>'],
      ['Como você define o termo “dado”?', '<p>Dado é o registro bruto de um fato (um número, um texto, uma data). Sozinho ele diz pouco; com contexto e interpretação vira informação. Ex.: “25” é dado; “a idade do aluno é 25” é informação.</p>'],
      ['Você já teve experiência negativa com a segurança dos seus dados?', '<p>Resposta pessoal. Ponto de discussão: vazamentos, senhas fracas e controle de acesso mostram por que segurança e autorização são funções centrais de um SGBD.</p>'],
      ['Que contato você já teve com BD (trabalho, estudo, estágio)?', '<p>Resposta pessoal. Vale listar quais SGBDs, se foi modelando, consultando com SQL ou administrando.</p>'],
      ['Quais tipos de banco de dados você conhece?', '<p>Relacionais (MySQL), chave-valor em memória (Redis), de análise em nuvem (Snowflake) e de busca por índices (ElasticSearch), entre outros.</p>'],
    ] },
  ],
  challenges: [
    { stem: 'Uma equipe precisa de um armazenamento em memória, do tipo chave-valor, para servir de cache e fila de mensagens de uma aplicação. Entre os SGBDs estudados, qual atende melhor a essa necessidade?',
      opts: ['MySQL', 'Redis', 'Snowflake', 'ElasticSearch', 'Um arquivo de texto compartilhado'], c: 1,
      e: '<p>Redis guarda dados em memória no modelo chave-valor, o que o torna adequado para cache e filas.</p>',
      w: ['MySQL é relacional, cliente-servidor.', 'Snowflake é voltado a análise de dados em nuvem.', 'ElasticSearch é otimizado para busca sobre índices.'] },
    { stem: 'Sobre o conceito de “mini-mundo” em bancos de dados, assinale a alternativa correta.',
      opts: ['É o conjunto de programas que gerencia o BD.', 'É a parte do mundo real representada no BD; mudanças nela devem ser refletidas no BD.', 'É o modelo lógico com tabelas e chaves.', 'É o backup do banco em outro servidor.', 'É o nome dado a um BD com poucos registros.'], c: 1,
      e: '<p>O BD representa um domínio específico do mundo real, o mini-mundo. Se algo muda no mundo real, o BD deve acompanhar.</p>',
      w: ['A alternativa A descreve o SGBD, não o mini-mundo.', 'A C descreve o modelo lógico.', 'D e E não têm relação com o conceito.'] },
    { stem: 'O MySQL é amplamente usado em aplicações. Qual das afirmações a seguir o descreve corretamente?',
      opts: ['É um SGBD em memória do tipo chave-valor.', 'É um serviço de análise de dados em nuvem.', 'É um SGBD de código aberto, com arquitetura cliente-servidor, que roda em Linux, Windows e macOS.', 'Só pode ser usado por meio de linha de comando.', 'Não aceita consultas SQL.'], c: 2,
      e: '<p>O MySQL é de código aberto, hoje mantido pela Oracle, com servidor e clientes. Ferramentas como Workbench e DBeaver oferecem interface gráfica para executar consultas SQL.</p>',
      w: ['A descreve o Redis.', 'B descreve o Snowflake.', 'D e E estão erradas: há interfaces gráficas e o acesso é feito com SQL.'] },
  ],
});
