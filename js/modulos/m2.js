MODULES.push({
  id: 'a2', acc: 'cor', short: 'Introdução a BD e SGBD',
  title: 'Introdução a bancos de dados e SGBD',
  blurb: 'De arquivos soltos ao banco de dados compartilhado: o que é um BD, o que um SGBD faz, transações (ACID), integridade e quando não usar.',
  topics: [
    { g: 'Como tudo começou', t: 'Sistemas de arquivos e seus problemas', h:
      `<p>Numa empresa, cada setor (produção, compras, logística, vendas) mantinha os próprios arquivos. Os dados eram vistos do jeito que estavam armazenados.</p>` +
      ul(['Dificuldade de acesso: acessar os dados é mais complexo.', 'Não há linguagem padrão de consulta.', 'Os dados não são relacionados entre si.', '<b>Redundância, inconsistência e isolamento</b> dos dados.', 'Falta de segurança.', 'Problemas de integridade.']) +
      tip('Redundância, inconsistência e isolamento são o trio clássico de defeitos do modelo de arquivos. Se a questão descreve “o mesmo dado repetido e diferente em dois setores”, é isso.') },
    { t: 'A solução: compartilhamento de dados', h:
      `<p>Os dados passam a ser armazenados <b>uma única vez</b> e acessados por vários sistemas e aplicações (no exemplo, por vários setores).</p>` +
      flow(['Aplicações / sistemas', 'SGBD', 'Banco de dados']) +
      `<p>O surgimento vem da CODASYL (Conference on Data Systems Languages), ligada ao COBOL, com a proposta de uma nova tecnologia chamada banco de dados. O principal objetivo: <b>simplificar o desenvolvimento de aplicações</b> com uso intenso de dados.</p>` },
    { t: 'O que é um banco de dados', h:
      `<p><b>Definição:</b> conjunto de dados inter-relacionados e estruturados, confiáveis, coerentes e compartilhados por usuários com necessidades de informação diferentes.</p>` +
      ul(['Representa um domínio específico, aspectos do mundo real chamados de <b>mini-mundo</b>. Mudanças no mundo real devem ser refletidas no BD.', 'A organização estrutural é determinada pelo <b>modelo de dados</b>.', 'É manipulado por meio de um <b>SGBD</b>.']) +
      `<h4>Benefícios</h4>` + ul(['Rapidez no acesso às informações.', 'Redução de problemas de integridade e redundância.', 'Menos esforço humano no desenvolvimento.', 'Uso dos dados e controle integrado de informações distribuídas fisicamente.', 'É construído para atender a uma proposta específica.']) },
    { t: 'Banco de dados x sistemas de arquivos', h:
      T(['', 'Sistemas de arquivos', 'Bancos de dados'], [
        ['Quem define os dados?', 'Cada usuário define e implementa os arquivos de sua aplicação', 'Um único repositório, projetado a partir do estudo de requisitos'],
        ['Acesso', 'Cada aplicação com seus arquivos', 'Vários usuários e aplicações acessam o mesmo repositório'],
        ['Problemas típicos', 'Redundância, inconsistência, isolamento', 'Controlados pelo SGBD'],
      ]) },
    { g: 'SGBD', t: 'O que é um SGBD e o que ele faz', h:
      `<p><b>SGBD</b> (Sistema Gerenciador de Bancos de Dados) é o conjunto de programas para criar, armazenar e manipular bancos de dados. Ele oferece um ambiente eficiente e simples para executar tarefas no BD e <b>segue um modelo de dados</b>.</p>` +
      `<h4>Principais funcionalidades</h4>` + ul(['Criação e definição de bancos de dados', 'Inserção, atualização e exclusão de dados', 'Recuperação de dados', 'Controle de acesso', 'Controle de concorrência', 'Backup e restauração', 'Otimização de consultas']) +
      `<h4>Vantagens</h4>` + ul(['Visão abstrata dos dados: o usuário não precisa conhecer detalhes de implementação e manutenção.', 'Compartilhamento entre usuários autorizados.', 'Backup e recuperação automáticos em caso de falhas.', 'Menos tempo de desenvolvimento e de manutenção.']) +
      trap('BD e SGBD não são a mesma coisa. BD são os dados organizados; SGBD é o software que os gerencia.') },
    { t: 'Redundância, segurança e desempenho', h:
      boxes([['Controle da redundância', 'Normalização de dados.'], ['Acesso não autorizado', 'Subsistema de segurança e autorização.'], ['Consulta eficiente', 'Estruturas de armazenamento e técnicas de pesquisa: índices, buffering ou caching, processamento e otimização de consulta.']], 'grid3') },
    { t: 'Metadados', h:
      `<p><b>Metadados</b> são informações sobre a estrutura dos dados: a definição completa da estrutura e das restrições do BD. É o que permite ao SGBD saber quais tabelas, colunas, tipos e regras existem.</p>` },
    { t: 'Transações e propriedades ACID', h:
      `<p><b>Transação:</b> programa em execução (ou processo) que inclui um ou mais acessos ao banco de dados.</p>` +
      boxes([['A · Atomicidade', 'A transação é uma unidade indivisível: todas as operações concluem com sucesso ou nenhuma vale. Se houver erro, ocorre <b>rollback</b> e o BD volta ao estado anterior.'], ['C · Consistência', 'A transação obedece às regras e restrições definidas e mantém a integridade. Se violar alguma regra, é revertida.'], ['I · Isolamento', 'Cada transação parece executar isoladamente das outras.'], ['D · Durabilidade', 'Depois do <b>commit</b>, as mudanças são permanentes e sobrevivem a qualquer falha.']]) +
      tip('Associe a palavra-chave à letra: “tudo ou nada” = atomicidade; “obedece às regras” = consistência; “não enxerga as outras” = isolamento; “continua lá depois da falha” = durabilidade.') },
    { t: 'Restrições de integridade e regras de negócio', h:
      `<p>O SGBD impõe restrições de integridade e regras de negócio.</p>` +
      boxes([['Integridade referencial', 'Cada registro de turma deve estar relacionado a um registro de disciplina.'], ['Chave ou singularidade', 'Cada registro da tabela deve ter um código único.'], ['Gatilhos (triggers)', 'Regra ativada por atualizações na tabela.'], ['Procedimentos armazenados (stored procedures)', 'Procedimentos mais elaborados para impor regras.']]) },
    { t: 'Quando NÃO usar um SGBD', h:
      `<p>Arquivos comuns podem ser mais desejáveis quando:</p>` + ul(['o projeto é pequeno, a aplicação é simples e não se esperam muitas mudanças;', 'a complexidade dos dados é baixa;', 'há requisitos rigorosos de desempenho, como tempo real;', 'o sistema é embarcado, com capacidade de armazenamento limitada;', 'os recursos de hardware ou software são muito limitados;', 'não há acesso de múltiplos usuários aos dados.']) },
    { g: 'Ferramentas', t: 'Principais SGBDs', h:
      boxes([['MySQL', 'Código aberto, hoje da Oracle (2010). Cliente-servidor: o servidor cuida de armazenamento, execução de transações e acesso. Interface gráfica: MySQL Workbench ou DBeaver, para executar, manipular e manter dados com consultas SQL. Linux, Windows e macOS.'], ['Redis', 'Em memória, chave-valor. Cache e fila de mensagens.'], ['Snowflake', 'Análise de dados em nuvem. Big data em tempo real.'], ['ElasticSearch', 'Armazena dados em índices. Busca otimizada.']]) },
  ],
  examples: [
    { t: 'Simulador de transação bancária (ACID)', d: 'Transfira dinheiro entre duas contas. Marque “simular falha” ou tente transferir mais do que o saldo e veja o SGBD desfazer tudo.', mount(el) {
      el.innerHTML = `<div class="split"><div>
        <div class="bal"><div>Conta A<b id="ba">R$ 500</b></div><div>Conta B<b id="bb">R$ 300</b></div></div>
        <div class="ctrl"><label>Valor R$ <input type="number" id="v" value="200" min="1" style="width:100px"></label><label><input type="checkbox" id="f"> simular falha após o débito</label></div>
        <div class="ctrl"><button class="btn" id="go">Executar transação</button><button class="smallbtn" id="rs">Zerar saldos</button></div>
        <div class="log" id="lg" aria-live="polite"><div>Aguardando…</div></div><div id="bn"></div></div>
        <div class="gifbox"><img src="${GIF.acid}" alt="Animação de commit e rollback"></div></div>`;
      let A = 500, B = 300, busy = false;
      const show = () => { $('#ba', el).textContent = 'R$ ' + A; $('#bb', el).textContent = 'R$ ' + B; };
      $('#rs', el).onclick = () => { A = 500; B = 300; show(); $('#lg', el).innerHTML = '<div>Aguardando…</div>'; $('#bn', el).innerHTML = ''; };
      $('#go', el).onclick = async () => {
        if (busy) return; busy = true;
        const v = Math.max(1, +$('#v', el).value || 1), fail = $('#f', el).checked, a0 = A, b0 = B, lg = $('#lg', el);
        lg.innerHTML = ''; $('#bn', el).innerHTML = '';
        const line = (t, c = '') => { lg.insertAdjacentHTML('beforeend', `<div class="${c}">${t}</div>`); return new Promise((r) => setTimeout(r, 420)); };
        await line('BEGIN TRANSACTION', 'go');
        await line(`UPDATE conta SET saldo = saldo - ${v} WHERE id = 'A'`); A -= v; show();
        if (A < 0) { await line('Regra violada: saldo não pode ser negativo', 'er'); await line('ROLLBACK', 'er'); A = a0; B = b0; show(); $('#bn', el).innerHTML = '<div class="banner bad">Consistência: a transação violou uma regra e foi revertida. Saldos de volta ao original.</div>'; busy = false; return; }
        if (fail) { await line('!! falha do sistema antes do crédito', 'er'); await line('ROLLBACK', 'er'); A = a0; B = b0; show(); $('#bn', el).innerHTML = '<div class="banner bad">Atomicidade: só metade da operação ocorreu, então tudo foi desfeito.</div>'; busy = false; return; }
        await line(`UPDATE conta SET saldo = saldo + ${v} WHERE id = 'B'`); B += v; show();
        await line('COMMIT', 'go'); $('#bn', el).innerHTML = '<div class="banner ok">Commit: mudanças permanentes (durabilidade). O total A + B continua R$ 800.</div>'; busy = false;
      };
    } },
    { t: 'Laboratório de integridade', d: 'Tente inserir e excluir registros e veja qual restrição do SGBD entra em ação.', mount(el) {
      let disc = [['BD01', 'Banco de Dados'], ['ES02', 'Engenharia de Software']], turma = [['T1', 'BD01'], ['T2', 'BD01'], ['T3', 'ES02']];
      const draw = (msg, ok) => {
        el.innerHTML = `<div class="grid2"><div>${T(['cod (PK)', 'nome'], disc, { cap: 'DISCIPLINA' })}</div><div>${T(['id (PK)', 'cod_disc (FK)'], turma, { cap: 'TURMA' })}</div></div>
        <div class="grid2"><div class="box"><b class="h">Inserir turma</b><div class="ctrl"><input type="text" id="ti" placeholder="id, ex.: T4" size="8"><input type="text" id="td" placeholder="cod_disc, ex.: XX99" size="12"><button class="smallbtn" id="it">Inserir</button></div></div>
        <div class="box"><b class="h">Inserir ou excluir disciplina</b><div class="ctrl"><input type="text" id="di" placeholder="cod" size="6"><input type="text" id="dn" placeholder="nome" size="12"><button class="smallbtn" id="id">Inserir</button></div><div class="ctrl"><select id="dx">${disc.map((d) => `<option>${d[0]}</option>`).join('')}</select><button class="smallbtn" id="dd">Excluir disciplina</button></div></div></div>
        <div id="m">${msg ? `<div class="banner ${ok ? 'ok' : 'bad'}">${msg}</div>` : ''}</div>`;
        $('#it', el).onclick = () => { const i = $('#ti', el).value.trim(), d = $('#td', el).value.trim().toUpperCase(); if (!i || !d) return draw('Preencha id e cod_disc.', false);
          if (turma.some((t) => t[0] === i)) return draw(`Integridade de chave: o id “${i}” já existe. Chave primária não pode repetir.`, false);
          if (!disc.some((x) => x[0] === d)) return draw(`Integridade referencial: “${d}” não existe em DISCIPLINA. Inserção recusada.`, false);
          turma.push([i, d]); draw('Turma inserida. A chave estrangeira aponta para uma disciplina existente.', true); };
        $('#id', el).onclick = () => { const c = $('#di', el).value.trim().toUpperCase(), n = $('#dn', el).value.trim(); if (!c || !n) return draw('Preencha cod e nome.', false);
          if (disc.some((x) => x[0] === c)) return draw(`Integridade de chave: a disciplina “${c}” já existe.`, false);
          disc.push([c, n]); draw('Disciplina inserida.', true); };
        $('#dd', el).onclick = () => { const c = $('#dx', el).value; const usada = turma.filter((t) => t[1] === c).length; if (usada) return draw(`Integridade referencial: há ${usada} turma(s) que referenciam ${c}. Exclusão recusada.`, false);
          disc = disc.filter((x) => x[0] !== c); draw(`Disciplina ${c} excluída (nenhuma turma dependia dela).`, true); };
      };
      draw('', true);
    } },
  ],
  activities: [
    { t: 'Arquivos ou banco de dados?', d: 'Diga a que abordagem cada característica pertence.', kind: 'classify',
      cfg: { choices: ['Sistema de arquivos', 'Banco de dados + SGBD'], items: [
        { t: 'Cada setor cria e mantém os arquivos da sua aplicação.', a: 0, why: 'No modelo de arquivos, cada usuário define e implementa os arquivos de que precisa.' },
        { t: 'Dados armazenados uma única vez e acessados por vários sistemas.', a: 1, why: 'É o compartilhamento de dados que o BD traz.' },
        { t: 'Não existe uma linguagem padrão de consulta.', a: 0, why: 'Com SGBD há linguagem de consulta padrão (SQL).' },
        { t: 'Backup e restauração automáticos em caso de falha.', a: 1, why: 'O SGBD tem subsistema de backup e recuperação.' },
        { t: 'Redundância e inconsistência entre cópias dos mesmos dados.', a: 0, why: 'Problema típico de arquivos separados por setor.' },
        { t: 'Subsistema de segurança e autorização.', a: 1, why: 'O SGBD restringe o acesso não autorizado.' },
        { t: 'Repositório único projetado a partir de um estudo de requisitos.', a: 1, why: 'É a definição de BD x sistema de arquivos vista em aula.' },
        { t: 'Dados isolados, sem relação entre os arquivos.', a: 0, why: 'Isolamento e falta de relação são problemas do modelo de arquivos.' },
      ] } },
    { t: 'Usar SGBD ou arquivo comum?', d: 'Decida para cada cenário o que faz mais sentido.', kind: 'classify',
      cfg: { choices: ['SGBD', 'Arquivo comum'], items: [
        { t: 'Sistema de matrícula de uma faculdade, com milhares de alunos acessando ao mesmo tempo.', a: 0, why: 'Muitos usuários, dados relacionados e necessidade de integridade e segurança.' },
        { t: 'Programa pequeno e simples que guarda a última configuração de um único usuário.', a: 1, why: 'Projeto pequeno, dados simples e um só usuário.' },
        { t: 'Sistema embarcado com armazenamento muito limitado e requisitos de tempo real.', a: 1, why: 'Restrições de hardware e desempenho rigoroso favorecem arquivos.' },
        { t: 'Loja virtual com clientes, pedidos, estoque e pagamentos inter-relacionados.', a: 0, why: 'Dados complexos e inter-relacionados, com concorrência e integridade.' },
      ] } },
    { t: 'Perguntas para fixar', d: 'Tente responder de cabeça e depois abra a resposta.', kind: 'qa', items: [
      ['Qual a diferença entre banco de dados e SGBD?', '<p>BD é o conjunto de dados inter-relacionados que representa o mini-mundo. SGBD é o software que cria, armazena e manipula esses dados, seguindo um modelo de dados.</p>'],
      ['Cite cinco funções de um SGBD.', '<p>Criação e definição do BD; inserção, atualização e exclusão; recuperação de dados; controle de acesso; controle de concorrência; backup e restauração; otimização de consultas (basta citar cinco).</p>'],
      ['Explique cada letra de ACID com um exemplo.', '<p><b>A:</b> transferência que falha no meio é desfeita por completo. <b>C:</b> transação que deixaria saldo negativo é rejeitada. <b>I:</b> dois saques simultâneos não se enxergam pela metade. <b>D:</b> após o commit, a queda de energia não desfaz a transferência.</p>'],
      ['O que são metadados?', '<p>Informações sobre a estrutura dos dados: definição completa da estrutura e das restrições do BD.</p>'],
      ['Cite dois cenários em que é melhor não usar SGBD.', '<p>Aplicações pequenas e simples, sistemas embarcados com armazenamento limitado, requisitos rigorosos de tempo real ou ausência de acesso de múltiplos usuários.</p>'],
    ] },
  ],
  challenges: [
    { stem: 'Em uma transferência bancária, o sistema debita R$ 200 da conta A e deveria, em seguida, creditar R$ 200 na conta B. Após o débito ocorre uma falha e o crédito não é executado. O SGBD desfaz o débito e as duas contas voltam ao estado original. Qual propriedade das transações garante esse comportamento?',
      opts: ['Isolamento, pois as transações não interferem entre si.', 'Durabilidade, pois o débito é permanente após confirmado.', 'Atomicidade, pois a transação é executada por completo ou nada é executado.', 'Redundância controlada, pois os saldos são duplicados.', 'Integridade referencial, pois B referencia A.'], c: 2,
      e: '<p>A transação é uma unidade indivisível: ou todas as operações concluem, ou todas são desfeitas (rollback).</p>',
      w: ['Isolamento trata de transações simultâneas, não de desfazer uma falha.', 'Durabilidade vale depois do commit; aqui a transação nem foi confirmada.', 'Redundância controlada é assunto de normalização.', 'Integridade referencial liga chave estrangeira a chave primária.'] },
    { stem: 'Depois que uma transação é confirmada com commit, ocorre uma queda de energia no servidor. Ao reiniciar, os dados alterados por essa transação continuam gravados. Qual propriedade ACID foi respeitada?',
      opts: ['Atomicidade', 'Consistência', 'Isolamento', 'Durabilidade', 'Normalização'], c: 3,
      e: '<p>Durabilidade: uma vez confirmada, a mudança é permanente e sobrevive a qualquer tipo de falha.</p>',
      w: ['Atomicidade fala de tudo ou nada.', 'Consistência fala de respeitar regras e restrições.', 'Isolamento fala de execução sem interferência.', 'Normalização não é propriedade de transação.'] },
    { stem: 'Duas transações executam ao mesmo tempo sobre a mesma tabela, mas cada uma se comporta como se estivesse sozinha no sistema. Essa característica corresponde a qual propriedade?',
      opts: ['Durabilidade', 'Isolamento', 'Atomicidade', 'Redundância', 'Metadados'], c: 1,
      e: '<p>Isolamento: cada transação parece executar isoladamente das demais, apesar da concorrência.</p>',
      w: ['Durabilidade trata de permanência após o commit.', 'Atomicidade trata de tudo ou nada.', 'Redundância e metadados não são propriedades ACID.'] },
    { stem: 'Ao comparar sistemas de arquivos com SGBDs, qual das alternativas NÃO representa uma vantagem do uso de um SGBD?',
      opts: ['Controle de concorrência entre usuários.', 'Backup e recuperação após falhas.', 'Controle de acesso a usuários autorizados.', 'Dispensar o levantamento de requisitos, já que o SGBD organiza os dados sozinho.', 'Redução de redundância e de problemas de integridade.'], c: 3,
      e: '<p>O BD é projetado a partir do estudo de requisitos. O SGBD gerencia os dados, mas não substitui o projeto.</p>',
      w: ['As demais alternativas são funcionalidades e benefícios citados para SGBDs.'] },
    { stem: 'Uma regra do sistema exige que, sempre que a tabela de matrículas for atualizada, um registro seja gravado automaticamente em uma tabela de histórico. Qual recurso do SGBD atende a essa necessidade?',
      opts: ['Metadados', 'Índice', 'Gatilho (trigger)', 'Backup', 'Chave primária'], c: 2,
      e: '<p>Um trigger é uma regra ativada por atualizações na tabela, ideal para ações automáticas como gravar histórico.</p>',
      w: ['Metadados descrevem a estrutura do BD.', 'Índice acelera consultas.', 'Backup copia dados para recuperação.', 'Chave primária identifica registros de forma única.'] },
    { stem: 'Uma equipe vai desenvolver um utilitário simples, embarcado em um equipamento com pouquíssimo armazenamento, usado por uma única pessoa e com dados de baixa complexidade. Qual decisão é mais adequada?',
      opts: ['Adotar um SGBD corporativo completo.', 'Usar arquivos comuns, pois o cenário não justifica um SGBD.', 'Criar um banco de dados distribuído em nuvem.', 'Implementar controle de concorrência entre milhares de usuários.', 'Usar um banco de dados de análise em big data.'], c: 1,
      e: '<p>Projetos pequenos e simples, com hardware limitado e sem múltiplos usuários, estão entre os casos em que arquivos comuns são preferíveis.</p>',
      w: ['As demais opções trazem complexidade e custo desproporcionais ao cenário.'] },
  ],
});
