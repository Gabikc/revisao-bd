(function () {
  const ALUNO = [['00012233', 'João Paulo', 'D01', 'Banco de Dados I', '8,5'], ['00223345', 'Maria Clara', 'D02', 'Banco de Dados II', '9,0'], ['00012233', 'João Paulo', 'D03', 'Sistemas Distribuídos', '8,0'], ['00223888', 'Carlos Eduardo', 'D02', 'Banco de Dados II', '9,0']];
  const H5 = ['Matrícula', 'Nome', 'Cod_disciplina', 'Nome_disciplina', 'Nota'];
  const decomp = () =>
    `<div class="grid2">${T(['Matrícula', 'Cod_disciplina', 'Nota'], ALUNO.map((r) => [r[0], r[2], r[4]]), { cap: 'nota' })}${T(['Cod_disciplina', 'Nome_disciplina'], [['D01', 'Banco de Dados I'], ['D02', 'Banco de Dados II'], ['D03', 'Sistemas Distribuídos']], { cap: 'disciplina' })}</div>` +
    T(['Matrícula', 'Nome'], [['00012233', 'João Paulo'], ['00223345', 'Maria Clara'], ['00223888', 'Carlos Eduardo']], { cap: 'aluno' });

  /* dados do detector de dependência funcional */
  const COLS = ['Cod_disciplina', 'Horario', 'Nome_disciplina', 'Mat_professor', 'Nome_professor'];
  const DATA = [
    ['COMP2002', '10:00 às 12:00', 'Banco de Dados', '00122', 'Gabi'],
    ['COMP2002', '14:00 às 16:00', 'Banco de Dados', '00023', 'Pamela'],
    ['COMP8832', '08:00 às 10:00', 'Teoria da Computação', '00023', 'Pamela'],
    ['COMP0019', '10:00 às 12:00', 'Algoritmos e Estrutura de Dados', '00021', 'Natacha'],
    ['COMP0019', '14:00 às 16:00', 'Algoritmos e Estrutura de Dados', '00021', 'Natacha'],
  ];

  MODULES.push({
    id: 'fn', n: 'FN', acc: 'vio', grp: 'Modelagem e projeto', src: 'Aula de Normalização', short: 'Normalização',
    title: 'Normalização: dependências funcionais e formas normais',
    blurb: 'Como organizar as tabelas para reduzir redundância e anomalias: dependência funcional, 1FN, 2FN, 3FN, BCNF e quando vale desnormalizar.',
    topics: [
      { g: 'Por que normalizar', t: 'O que é normalização', h:
        `<p>Normalização é o processo de organizar os dados e as tabelas de um banco de dados por meio de uma série de regras e procedimentos. Objetivo: minimizar</p>` +
        ul(['redundâncias;', 'anomalias de inserção, remoção e atualização.']) +
        `<p>Os esquemas resultantes devem <b>preservar a semântica original</b> (restrições de integridade, dados e relacionamentos). Um projeto conceitual bem feito resulta, naturalmente, em esquemas normalizados.</p>` +
        T(H5, ALUNO, { cap: 'aluno(matricula, nome, cod_disciplina, nome_disciplina, nota): repete nome do aluno e da disciplina' }) +
        `<p>Depois de normalizada, a informação fica dividida em três tabelas sem repetição:</p>` + decomp() },
      { t: 'Anomalias que a normalização evita', h:
        `<p>Na tabela única acima:</p>` +
        boxes([['Inserção', 'Não dá para cadastrar uma disciplina nova enquanto nenhum aluno cursar.'], ['Remoção', 'Apagar a única linha da disciplina D03 também apaga o fato de que ela existe.'], ['Atualização', 'Renomear “Banco de Dados II” exige mudar todas as linhas em que ela aparece; esquecer uma gera inconsistência.']], 'grid3') +
        note('Os três exemplos de anomalia são um complemento ao slide, que apenas as cita como objetivo.', 'Complemento') },
      { g: 'Dependência funcional', t: 'Dependência funcional (DF)', h:
        `<p>Dependência funcional é uma <b>restrição entre conjuntos de atributos</b> de uma relação, que deve valer em todos os estados da relação. É inferida a partir do <b>significado</b> dos atributos e é essencial para definir as formas normais.</p>` +
        `<p>Uma coluna C2 depende funcionalmente de C1 (C1 determina C2) quando, em todas as linhas, para cada valor de C1 aparece sempre o mesmo valor de C2.</p>` +
        `<div class="expr">A1 → A2 &nbsp;&nbsp;(A1 determina A2; A2 é funcionalmente dependente de A1)</div>` +
        `<p>No exemplo do aluno:</p>` + code('matricula → nome\ncod_disciplina → nome_disciplina\nmatricula, cod_disciplina → nota') +
        tip('O processo de normalização é guiado por três coisas: as dependências funcionais, as chaves primárias das relações e os testes para as formas normais.') },
      { t: 'Exercício: quais são as DFs?', h:
        T(COLS, DATA.slice(0, 3), { cap: 'Disciplina oferecida (exemplo do slide)' }) +
        code('cod_disciplina, horario → mat_professor\nmat_professor → nome_professor\ncod_disciplina → nome_disciplina') +
        `<p>O horário sozinho não determina o professor, nem o código sozinho: é a combinação dos dois. Teste isso no detector da aba <b>Exemplos</b>.</p>` },
      { g: 'Formas normais', t: '1ª forma normal (1FN)', h:
        `<p>O domínio de um atributo deve incluir apenas <b>valores atômicos</b> (únicos, indivisíveis), e o valor de qualquer atributo em uma tupla deve ser um único valor do domínio. Isso exclui <b>atributos multivalorados e compostos</b>.</p>` +
        T(COLS, [['COMP2002', '10:00 às 12:00', 'Banco de Dados', '00122, 00023', 'Gabi, Pamela'], ['COMP8832', '08:00 às 10:00', 'Teoria da Computação', '00023', 'Pamela']], { cap: 'Fora da 1FN: duas matrículas na mesma célula' }) +
        `<p>Correção: separar em duas tabelas.</p><div class="grid2">${T(['Cod_disciplina', 'Horario', 'Nome_disciplina'], [['COMP2002', '10:00 às 12:00', 'Banco de Dados'], ['COMP8832', '08:00 às 10:00', 'Teoria da Computação']], { cap: 'Disciplina' })}${T(['Cod_disciplina', 'Mat_professor', 'Nome_professor'], [['COMP2002', '00122', 'Gabi'], ['COMP2002', '00023', 'Pamela'], ['COMP8832', '00023', 'Pamela']], { cap: 'Disciplina_professor' })}</div>` },
      { t: '2ª forma normal (2FN) e dependência parcial', h:
        `<p>Uma relação está na 2FN se está na 1FN e <b>todo atributo não chave é plenamente dependente da chave primária</b>.</p>` +
        T(['Est_matricula', 'Cod_proj', 'Banco_horas', 'Nome_estudante', 'Nome_proj'], [['0022', '05', '100', 'Maria', 'ic'], ['0384', '03', '90', 'João', 'extensao'], ['8843', '01', '30', 'Maria', 'monitoria'], ['0909', '03', '150', 'Pedro', 'extensao']], { cap: 'estudante_projeto (chave: Est_matricula + Cod_proj)' }) +
        ul(['<b>Banco_horas</b> depende da matrícula <i>e</i> do projeto: dependência total, sem problema.', '<b>Nome_estudante</b> depende só da matrícula e <b>Nome_proj</b> só do código do projeto: dependências <b>parciais</b>. Note a redundância dos dados do projeto 03.']) +
        `<p>Correção: três tabelas.</p><div class="grid3">${T(['Est_matricula', 'Nome_estudante'], [['0022', 'Maria'], ['0384', 'João'], ['8843', 'Maria'], ['0909', 'Pedro']], { cap: 'estudante' })}${T(['Matricula', 'Cod_proj', 'Banco_horas'], [['0022', '05', '100'], ['0384', '03', '90'], ['8843', '01', '30'], ['0909', '03', '150']], { cap: 'estudante_projeto' })}${T(['Codigo', 'Nome_proj'], [['05', 'ic'], ['03', 'extensao'], ['01', 'monitoria']], { cap: 'projeto' })}</div>` +
        trap('A 2FN só pode ser violada quando a chave primária é composta. Se a chave tem uma única coluna, não existe dependência parcial.') },
      { t: '3ª forma normal (3FN) e dependência transitiva', h:
        `<p>Uma relação está na 3FN quando, além de estar na 2FN, <b>nenhum atributo não chave é transitivamente dependente da chave primária</b>.</p>` +
        `<p><b>Dependência transitiva:</b> uma coluna, além de depender da chave, depende de outra coluna (ou conjunto) da tabela. Na 3FN, nenhum atributo não chave pode ser determinado por outro atributo não chave.</p>` +
        T(['Num_emp', 'Nome_emp', 'Data_adm_emp', 'Cod_proj_emp', 'Dt_termino_proj'], [], { cap: 'Empregado' }) +
        `<p>A data de término do projeto depende do código do projeto do empregado, que por sua vez depende do número do empregado: <b>num_emp → cod_proj_emp → dt_termino_proj</b>.</p>` +
        `<div class="grid2">${T(['Num_emp', 'Nome_emp', 'Data_adm_emp', 'Cod_proj_emp'], [], { cap: 'Empregado' })}${T(['Cod_proj_emp', 'Dt_termino_proj'], [], { cap: 'Projeto' })}</div>` },
      { t: 'Forma normal de Boyce-Codd (BCNF)', h:
        `<p>Uma relação está em BCNF se está na 3FN e nenhum atributo possui dependência transitiva com relação à chave primária. Em outras palavras: <b>em toda dependência funcional X → Y, X é uma chave candidata</b>.</p>` +
        code('ensina(aluno, disciplina, professor)\nDF1: {aluno, disciplina} → professor\nDF2: professor → disciplina') +
        T(['aluno', 'disciplina', 'professor'], [['Ana', 'Banco de Dados I', 'Bernadette'], ['Paulo', 'Banco de Dados II', 'Paulo Marcelo'], ['Pedro', 'Redes', 'Marciel'], ['Ana', 'Grafos', 'Marcos Negreiros']]) +
        `<p>Não viola a 3FN, mas viola a BCNF: <b>professor</b> determina <b>disciplina</b>, e professor não é chave candidata (a disciplina é parte da chave).</p>` +
        sch('professor_disciplina', ['*professor', 'disciplina']) + sch('aluno_professor', ['*^aluno', '*^professor']) +
        note('A decomposição acima é a solução usual para esse caso; o slide apresenta o problema.', 'Complemento') },
      { t: 'Resumo: como testar cada forma normal', h:
        T(['Forma', 'Pergunta a fazer', 'Corrige com'], [
          ['1FN', 'Há atributo multivalorado ou composto?', 'Tabela separada ou colunas atômicas'],
          ['2FN', 'Algum atributo depende de parte da chave composta?', 'Tabela para a parte da chave e seus dependentes'],
          ['3FN', 'Algum atributo não chave determina outro não chave?', 'Tabela para o determinante e seus dependentes'],
          ['BCNF', 'Todo determinante de uma DF é chave candidata?', 'Decompor pelo determinante'],
        ]) + `<p>Cada forma inclui as anteriores: BCNF ⊂ 3FN ⊂ 2FN ⊂ 1FN.</p>` },
      { g: 'Desnormalização', t: 'E a desnormalização?', h:
        `<p>Estudamos um modelo de dados <b>relacional</b>: garante consistência, mas gera <i>overhead</i> (custo de tempo, recurso ou complexidade) para manter as restrições. Existem os modelos <b>dimensionais</b>, cujo propósito é entregar dados agrupados para consulta (data warehouse, BI, analytics).</p>` +
        boxes([['Desnormalizar ≠ não normalizar', 'Desnormalizar é uma decisão consciente, com objetivo claro: diminuir custos.'], ['Quando aplicar', 'Em casos que exigem melhor performance e desempenho do banco.']]) },
      { g: 'Atividade', t: 'Atividade proposta', h:
        `<p><b>Parte 1.</b> Escolha um domínio e desenvolva um modelo lógico relacional com no mínimo 3 entidades iniciais, mas que <b>não esteja normalizado</b>.</p><p><b>Parte 2.</b> Troque de modelo com o colega, aplique as 3 formas normais para normalizar o modelo e explique o que mudou em cada FN.</p>` },
    ],
    examples: [
      { t: 'Normalizando a tabela do aluno', d: 'Acompanhe a tabela com redundância sendo decomposta em três.', mount(el) {
        renderStepper(el, { steps: [
          { t: 'Tabela original', d: 'A chave é (matrícula, cod_disciplina). O nome do aluno e o nome da disciplina se repetem.' },
          { t: 'Dependências funcionais', d: 'matricula → nome · cod_disciplina → nome_disciplina · (matricula, cod_disciplina) → nota. As duas primeiras são dependências parciais da chave.' },
          { t: 'Decomposição', d: 'Cada determinante vira chave de sua própria tabela, e a nota fica na tabela que combina aluno e disciplina.' },
        ], render: (s) => (s < 3 ? T(H5, ALUNO, { hl: s === 2 ? [0, 2] : [], cap: 'aluno' }) + (s === 2 ? '<p style="color:var(--muted);font-size:.9rem">Linhas destacadas: João Paulo aparece duas vezes, com o mesmo nome.</p>' : '') : decomp()) });
      } },
      { t: 'Detector de dependência funcional', d: 'Escolha os atributos determinantes e o dependente: a ferramenta testa se X → Y vale nos dados abaixo.', mount(el) {
        el.innerHTML = `${T(COLS, DATA)}<div class="ctrl"><span>Determinante X:</span>${COLS.map((c, i) => `<label><input type="checkbox" data-x="${i}" ${i < 2 ? 'checked' : ''}> ${c}</label>`).join('')}</div><div class="ctrl"><label>Dependente Y: <select id="y">${COLS.map((c, i) => `<option value="${i}" ${i === 3 ? 'selected' : ''}>${c}</option>`).join('')}</select></label></div><div id="o"></div>`;
        const upd = () => {
          const xs = $$('input[data-x]', el).filter((c) => c.checked).map((c) => +c.dataset.x), y = +$('#y', el).value;
          if (!xs.length) { $('#o', el).innerHTML = '<div class="empty">Marque ao menos um atributo em X.</div>'; return; }
          if (xs.includes(y)) { $('#o', el).innerHTML = '<div class="banner ok">Trivial: um atributo sempre determina a si mesmo.</div>'; return; }
          const groups = {};
          DATA.forEach((r, i) => { const k = xs.map((x) => r[x]).join('|'); (groups[k] = groups[k] || []).push(i); });
          const bad = Object.values(groups).find((ix) => new Set(ix.map((i) => DATA[i][y])).size > 1);
          const lhs = xs.map((x) => COLS[x]).join(', ').toLowerCase();
          $('#o', el).innerHTML = bad
            ? `<div class="expr">${lhs} → ${COLS[y].toLowerCase()}</div><div class="banner bad">Não vale. Mesmo valor de X com valores diferentes de Y nas linhas ${bad.map((i) => i + 1).join(' e ')}.</div>${T(COLS, bad.map((i) => DATA[i]))}`
            : `<div class="expr">${lhs} → ${COLS[y].toLowerCase()}</div><div class="banner ok">Vale nestes dados: cada valor de X aparece sempre com o mesmo Y.</div><p style="color:var(--muted);font-size:.9rem">Atenção: uma DF vem do <b>significado</b> dos atributos. Poucos dados nunca provam que ela vale; eles só podem mostrar que ela <i>não</i> vale.</p>`;
        };
        $$('input,select', el).forEach((x) => x.addEventListener('input', upd)); upd();
      } },
    ],
    activities: [
      { t: 'Qual forma normal está sendo violada?', d: 'Leia cada situação e indique o problema.', kind: 'classify',
        cfg: { choices: ['1FN', '2FN', '3FN', 'BCNF'], items: [
          { t: 'A coluna telefone guarda “8888-1111, 9999-2222” na mesma célula.', a: 0, why: 'Valor não atômico: atributo multivalorado.' },
          { t: 'estudante_projeto(est_matricula, cod_proj, banco_horas, nome_estudante): nome_estudante depende só de est_matricula.', a: 1, why: 'Dependência parcial da chave composta.' },
          { t: 'Empregado(num_emp, nome, cod_proj, dt_termino_proj): dt_termino_proj depende de cod_proj.', a: 2, why: 'Dependência transitiva: num_emp → cod_proj → dt_termino_proj.' },
          { t: 'ensina(aluno, disciplina, professor), com professor → disciplina e professor não sendo chave candidata.', a: 3, why: 'Determinante que não é chave candidata. Está na 3FN, mas viola a BCNF.' },
          { t: 'O endereço é guardado como “Rua A, 10, Centro” em uma única coluna, mas precisa ser usado por partes.', a: 0, why: 'Atributo composto não atômico.' },
          { t: 'Tabela com chave simples id em que cidade determina estado.', a: 2, why: 'id → cidade → estado: dependência transitiva. Com chave simples não há dependência parcial.' },
        ] } },
      { t: 'Perguntas para fixar', d: 'Responda e depois confira.', kind: 'qa', items: [
        ['Quais as DFs da tabela disciplina_oferecida(cod_disciplina, horario, nome_disciplina, mat_professor, nome_professor)?', code('cod_disciplina, horario → mat_professor\nmat_professor → nome_professor\ncod_disciplina → nome_disciplina')],
        ['Qual a diferença entre desnormalizar e não normalizar?', '<p>Não normalizar é não ter feito (ou não saber fazer) o trabalho. Desnormalizar é voltar atrás de forma consciente, com objetivo claro (diminuir custos, ganhar desempenho), sabendo o preço em redundância.</p>'],
        ['Por que a 2FN só importa para chave composta?', '<p>A dependência parcial é a dependência de <i>parte</i> da chave. Com chave de uma única coluna não há “parte”: se a tabela está na 1FN, já está na 2FN.</p>'],
        ['Normalizar mais é sempre melhor?', '<p>Não. Mais tabelas significam mais junções nas consultas. Em cenários de consulta intensiva (BI, data warehouse) usa-se modelagem dimensional ou desnormaliza-se de propósito.</p>'],
        ['Explique a diferença entre 3FN e BCNF.', '<p>Na 3FN, nenhum atributo não chave pode depender de outro não chave. Na BCNF a regra é mais forte: em toda DF X → Y, X deve ser chave candidata. Todo esquema em BCNF está em 3FN, mas não o contrário.</p>'],
      ] },
      { t: 'Autoavaliação da atividade proposta', d: 'Marque o que o seu trabalho já tem.', kind: 'check',
        cfg: { items: ['Escolhi um domínio e montei um modelo lógico com 3 ou mais entidades, sem normalizar.', 'Listei as dependências funcionais do modelo do colega.', 'Apliquei a 1FN e expliquei o que mudou.', 'Apliquei a 2FN e expliquei o que mudou.', 'Apliquei a 3FN e expliquei o que mudou.', 'Conferi se as chaves estrangeiras continuam preservando os relacionamentos originais.'] } },
    ],
    challenges: [
      { stem: 'Qual é o principal objetivo do processo de normalização de um esquema relacional?',
        opts: ['Aumentar a redundância para acelerar consultas.', 'Minimizar redundâncias e anomalias de inserção, remoção e atualização, preservando a semântica.', 'Eliminar as chaves estrangeiras.', 'Transformar todas as tabelas em uma só.', 'Substituir o modelo relacional pelo dimensional.'], c: 1,
        e: '<p>A normalização organiza as tabelas por regras que reduzem redundância e anomalias, sem perder o significado dos dados.</p>', w: ['A é o oposto; C e D destroem a estrutura; E trata de outro modelo.'] },
      { stem: 'Em aluno(matricula, nome, cod_disciplina, nome_disciplina, nota), qual dependência funcional é válida?',
        opts: ['nome → matricula', 'nome_disciplina → nota', 'matricula, cod_disciplina → nota', 'cod_disciplina → matricula', 'nota → cod_disciplina'], c: 2,
        e: '<p>A nota depende do par aluno-disciplina. As outras setas invertem ou inventam dependências: nomes podem se repetir, por exemplo.</p>' },
      { stem: 'Uma tabela de clientes guarda na coluna telefone valores como “8888-1111, 9999-2222”. Qual forma normal está sendo violada?',
        opts: ['1FN, pois há atributo com valores não atômicos.', '2FN, pois há dependência parcial.', '3FN, pois há dependência transitiva.', 'BCNF, pois o determinante não é chave.', 'Nenhuma; a tabela está normalizada.'], c: 0,
        e: '<p>A 1FN exige valores atômicos. Mais de um número na mesma célula caracteriza atributo multivalorado.</p>' },
      { stem: 'A relação R(a, b, c, d) tem chave primária composta (a, b) e a dependência a → c. Qual forma normal é violada?',
        opts: ['1FN', '2FN', '3FN', 'Nenhuma', 'Somente a BCNF'], c: 1,
        e: '<p>c é atributo não chave que depende apenas de parte da chave (a): dependência parcial, que viola a 2FN.</p>', w: ['A 1FN trata de atomicidade; a 3FN, de dependência entre atributos não chave.'] },
      { stem: 'Em Empregado(num_emp, nome_emp, cod_proj_emp, dt_termino_proj), a data de término depende do projeto, que depende do empregado. Esse problema é uma:',
        opts: ['Dependência parcial, que viola a 2FN.', 'Dependência transitiva, que viola a 3FN.', 'Violação da 1FN.', 'Dependência multivalorada.', 'Chave candidata alternativa.'], c: 1,
        e: '<p>num_emp → cod_proj_emp → dt_termino_proj. A solução é criar a tabela Projeto(cod_proj, dt_termino).</p>' },
      { stem: 'Em ensina(aluno, disciplina, professor), valem {aluno, disciplina} → professor e professor → disciplina. A relação está na 3FN, mas não na BCNF. Por quê?',
        opts: ['Porque a chave é simples.', 'Porque professor determina disciplina e não é chave candidata.', 'Porque há atributo multivalorado.', 'Porque falta chave estrangeira.', 'Porque aluno não depende de ninguém.'], c: 1,
        e: '<p>BCNF exige que todo determinante seja chave candidata. “professor” determina “disciplina” sem ser chave candidata.</p>' },
      { stem: 'Sobre desnormalização, é correto afirmar que:',
        opts: ['É o mesmo que não normalizar o banco.', 'É feita de forma consciente, com objetivo claro de reduzir custos, em casos que exigem melhor desempenho.', 'Só se aplica a bancos sem chaves.', 'Garante mais consistência que o modelo normalizado.', 'É proibida em data warehouse.'], c: 1,
        e: '<p>Desnormalizar é diferente de não normalizar: é uma escolha deliberada para ganhar desempenho, aceitando alguma redundância.</p>' },
      { stem: 'Sobre a relação entre as formas normais, assinale a alternativa correta.',
        opts: ['Uma relação em BCNF não precisa estar em 3FN.', 'Uma relação em 1FN está sempre em 2FN.', 'Uma relação em BCNF está obrigatoriamente em 3FN.', 'A 2FN é mais restritiva que a 3FN.', 'A 1FN exige ausência de chaves estrangeiras.'], c: 2,
        e: '<p>As formas se incluem: BCNF ⊂ 3FN ⊂ 2FN ⊂ 1FN. Tudo que está em BCNF está em 3FN.</p>' },
    ],
  });
})();
