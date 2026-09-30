(function () {
  const loc = (step) => er({ step, ls: 4, w: 900, h: 500, minw: 760, alt: 'Diagrama entidade-relacionamento da Vídeo Locadora', nodes: [
    { id: 'cliente', t: 'e', l: 'Cliente', x: 90, y: 300 }, { id: 'emp', t: 'e', l: 'Empréstimo', x: 430, y: 200 }, { id: 'res', t: 'e', l: 'Reserva', x: 430, y: 400 },
    { id: 'copia', t: 'e', l: 'Cópia', x: 780, y: 300 }, { id: 'filme', t: 'e', l: 'Filme', x: 780, y: 70 }, { id: 'gen', t: 'e', l: 'Gênero', x: 430, y: 62 },
    { id: 'r1', t: 'r', l: 'realiza', s: 3, x: 255, y: 200 }, { id: 'r2', t: 'r', l: 'realiza', s: 3, x: 255, y: 400 },
    { id: 'c1', t: 'r', l: 'contém', s: 3, x: 605, y: 250 }, { id: 'c2', t: 'r', l: 'inclui', s: 3, x: 605, y: 350 },
    { id: 'p', t: 'r', l: 'possui', s: 3, x: 780, y: 185 }, { id: 'tem', t: 'r', l: 'tem', s: 3, x: 605, y: 66 },
  ], edges: [
    ['cliente', 'r1', '(0,N)'], ['r1', 'emp', '', '(1,1)'], ['emp', 'c1', '(1,N)'], ['c1', 'copia', '', '(0,N)'],
    ['cliente', 'r2', '(0,N)'], ['r2', 'res', '', '(1,1)'], ['res', 'c2', '(1,N)'], ['c2', 'copia', '', '(0,N)'],
    ['filme', 'p', '(1,N)'], ['p', 'copia', '', '(1,1)'], ['gen', 'tem', '(0,N)'], ['tem', 'filme', '', '(1,N)'],
  ] });
  const locAttrs = T(['Entidade', 'Atributos'], [
    ['Cliente', 'cpf (identificador), nome, rg, endereço (composto), telefone (multivalorado: residencial e celular)'],
    ['Filme', 'código*, nome, duração, quantidade'], ['Gênero', 'código, descrição'], ['Cópia', 'código'],
    ['Empréstimo', 'código*, data do empréstimo, data de devolução, valor'], ['Reserva', 'código*, data da reserva, data prevista de empréstimo, situação (pendente ou finalizada)'],
  ]) + `<p style="color:var(--muted);font-size:.9rem">* O enunciado não informa identificador para Filme, Empréstimo e Reserva; assumimos um código.</p>`;

  const hosp1 = er({ w: 900, h: 440, minw: 760, alt: 'Corpo hospitalar e chefia do hospital', nodes: [
    { id: 'H', t: 'e', l: 'Hospital', x: 90, y: 210 }, { id: 'ch', t: 'r', l: 'chefia', x: 245, y: 210 }, { id: 'per', t: 'a', l: 'período', x: 245, y: 130 },
    { id: 'F', t: 'e', l: 'Funcionário', x: 610, y: 44 }, { id: 'g1', t: 'g', l: 't', x: 610, y: 120 },
    { id: 'M', t: 'e', l: 'Médico', x: 400, y: 205 }, { id: 'E', t: 'e', l: 'Enfermeiro', x: 610, y: 205 }, { id: 'A', t: 'e', l: 'Administrativo', x: 795, y: 205 },
    { id: 'g2', t: 'g', l: 't', x: 400, y: 285 }, { id: 'CL', t: 'e', l: 'Clínico', x: 320, y: 370 }, { id: 'CI', t: 'e', l: 'Cirurgião', x: 490, y: 370 },
  ], edges: [['H', 'ch', '(1,N)'], ['ch', 'M', '', '(0,N)'], ['ch', 'per'], ['F', 'g1'], ['g1', 'M'], ['g1', 'E'], ['g1', 'A'], ['M', 'g2'], ['g2', 'CL'], ['g2', 'CI']] });
  const hosp2 = er({ w: 820, h: 420, minw: 700, alt: 'Pacientes, consultas e exames', nodes: [
    { id: 'BOX', t: 'box', l: 'Consulta (agregação)', x: 330, y: 105, w: 640, h: 126 },
    { id: 'P', t: 'e', l: 'Paciente', x: 110, y: 120 }, { id: 'C', t: 'r', l: 'consulta', x: 330, y: 120 }, { id: 'M', t: 'e', l: 'Médico', x: 550, y: 120 }, { id: 'd', t: 'a', l: 'data', x: 330, y: 62 },
    { id: 'g', t: 'g', l: 't', x: 110, y: 215 }, { id: 'I', t: 'e', l: 'Interno', x: 50, y: 300 }, { id: 'X', t: 'e', l: 'Externo', x: 180, y: 300 },
    { id: 'rq', t: 'r', l: 'requisita', x: 330, y: 250 }, { id: 'EX', t: 'e', l: 'Exame', x: 330, y: 360 },
  ], edges: [['P', 'C', '(0,N)'], ['C', 'M', '', '(0,N)'], ['C', 'd'], ['P', 'g'], ['g', 'I'], ['g', 'X'], ['rq', 'BOX', '', '(0,N)'], ['EX', 'rq', '(1,N)']] });
  const hosp3 = er({ w: 760, h: 330, minw: 640, alt: 'Ternário paciente interno, cirurgia e cirurgião', nodes: [
    { id: 'I', t: 'e', l: 'Interno', x: 100, y: 140 }, { id: 'CI', t: 'e', l: 'Cirurgião', x: 660, y: 140 }, { id: 'CU', t: 'e', l: 'Cirurgia', x: 380, y: 285 },
    { id: 'r', t: 'r', l: 'realiza', x: 380, y: 150 }, { id: 'a1', t: 'a', l: 'data', x: 330, y: 62 }, { id: 'a2', t: 'a', l: 'histórico', x: 430, y: 62 },
  ], edges: [['I', 'r', '(0,N)'], ['CI', 'r', '(0,N)'], ['CU', 'r', '(0,N)'], ['r', 'a1'], ['r', 'a2']] });
  const hospAttrs = T(['Entidade', 'Atributos'], [
    ['Hospital', 'nome, cnpj, endereço (rua, número, bairro, cidade), telefone'],
    ['Funcionário (corpo hospitalar)', 'matrícula*, nome, endereço (rua, número, bairro, cidade), telefone, data de nascimento'],
    ['Médico', 'crm, especialidade (especializações: clínico e cirurgião)'], ['Enfermeiro', 'categoria, cre'], ['Administrativo', 'categoria, cargo'],
    ['Paciente', 'número do prontuário*, nome, telefone, ficha médica'], ['Interno', 'diagnóstico, tratamento, data de entrada, data de saída'], ['Externo', '(sem atributos próprios: são “todos os demais”)'],
    ['Consulta (relacionamento)', 'data'], ['Exame', 'número*, nome, descrição, requisitos'], ['Cirurgia', 'número*, nome, descrição, pós-operatório'], ['Realização da cirurgia', 'histórico, data'],
  ]) + `<p style="color:var(--muted);font-size:.9rem">* Identificadores plausíveis; o enunciado não os declara para todos.</p>`;

  const ENL = 'Uma Vídeo Locadora deseja informatizar seu sistema. Para isso é necessário guardar o cadastro de <mark class="e">clientes</mark> contendo: <mark class="a">nome</mark>, <mark class="a">cpf</mark>, <mark class="a">rg</mark>, <mark class="a">endereço</mark> e <mark class="a">telefone</mark> <mark class="c">(residencial e celular)</mark>. O cadastro de <mark class="e">filmes</mark> também deverá ser realizado, armazenando <mark class="a">nome</mark>, <mark class="a">duração</mark> e <mark class="a">quantidade</mark>. Os filmes <mark class="r">possuem</mark> <mark class="e">gêneros</mark>, e sobre eles deve ser guardado apenas o <mark class="a">código</mark> e a <mark class="a">descrição</mark>. Cada filme <mark class="r">possui</mark> várias <mark class="e">cópias</mark>. Cada cópia tem um <mark class="a">código</mark> e o filme que contém. <mark class="c">Para cada filme há pelo menos uma cópia, e cada cópia contém somente um filme.</mark> O cliente pode <mark class="r">realizar</mark> <mark class="e">empréstimos</mark>, ou <mark class="e">reservas</mark>. <mark class="c">Um cliente pode realizar vários empréstimos e reservas.</mark> <mark class="c">Cada empréstimo ou reserva pode conter vários filmes (cópias).</mark> Sobre o empréstimo é necessário armazenar a <mark class="a">data do empréstimo</mark>, a <mark class="a">data de devolução</mark> e o <mark class="a">valor</mark>. Sobre a reserva deve ser armazenada a <mark class="a">data da reserva</mark>, a <mark class="a">data prevista de empréstimo</mark> e a <mark class="a">situação da reserva</mark> (pendente, finalizada).';
  const ENH = 'Um <mark class="e">hospital</mark> é <mark class="r">chefiado</mark> por um <mark class="e">médico</mark> num <mark class="c">dado período de tempo</mark>; Hospital possui <mark class="a">nome</mark>, <mark class="a">cnpj</mark>, <mark class="a">endereço</mark> (rua, número, bairro e cidade) e <mark class="a">telefone</mark>. O <mark class="e">corpo hospitalar</mark>, denominação dada aos <mark class="e">funcionários</mark> de um hospital, possui <mark class="a">matrícula</mark>, <mark class="a">nome</mark>, <mark class="a">endereço</mark>, <mark class="a">telefone</mark> e <mark class="a">data de nascimento</mark>, e é formado basicamente por <mark class="c">três categorias: médicos, enfermeiros e administrativo</mark>. Médicos possuem <mark class="a">crm</mark> e <mark class="a">especialidade</mark>, e <mark class="c">podem ser clínicos ou cirurgiões e apenas estes últimos podem realizar cirurgias</mark>; um <mark class="a">histórico</mark> de como a cirurgia ocorreu é mantido, juntamente com suas respectivas <mark class="a">datas</mark> de realização. Além disso, cada <mark class="e">cirurgia</mark> é descrita por <mark class="a">número</mark>, <mark class="a">nome</mark>, <mark class="a">descrição</mark> e <mark class="a">pós-operatório</mark>. Enfermeiros têm <mark class="a">categoria</mark> e <mark class="a">cre</mark>, e o pessoal do administrativo possui <mark class="a">categoria</mark> e <mark class="a">cargo</mark>. <mark class="e">Pacientes</mark> vêm ao hospital para se <mark class="r">consultarem</mark> e/ou realizarem <mark class="e">exames</mark> <mark class="r">conforme requisitados pelas consultas</mark>. As <mark class="e">consultas</mark> acontecem em uma <mark class="a">data</mark>. Os pacientes possuem <mark class="a">número do prontuário</mark>, <mark class="a">nome</mark>, <mark class="a">telefone</mark> e <mark class="a">ficha médica</mark>. Os exames são descritos por <mark class="a">número</mark>, <mark class="a">nome</mark>, <mark class="a">descrição</mark> e <mark class="a">requisitos para realização</mark>. Os pacientes são classificados em <mark class="c">duas categorias: internos e externos</mark>. Internos são aqueles que devem permanecer no hospital por um período de tempo, podendo ser submetidos a algum tipo de cirurgia. Nesta categoria, <mark class="a">diagnóstico</mark>, <mark class="a">tratamento</mark>, <mark class="a">data de entrada</mark> e <mark class="a">saída</mark> são importantes. Sabe-se que o mesmo pode ser internado várias vezes para submeter-se a cirurgias distintas. <mark class="c">Neste cenário, paciente, cirurgia e cirurgião representam uma relação necessária.</mark> Externos são todos os demais pacientes.';
  const LEG = '<div class="legend"><mark class="e">entidade</mark><mark class="a">atributo</mark><mark class="r">relacionamento</mark><mark class="c">pista de cardinalidade, tipo ou generalização</mark></div>';

  MODULES.push({
    id: 'a5p', n: '5a', acc: 'cor', src: 'Aula 5, parte prática', short: 'Locadora e Hospital',
    title: 'Prática de modelagem E-R: Locadora e Hospital',
    blurb: 'Dois enunciados de dificuldade crescente. A locadora treina cardinalidades e entidades; o hospital reúne generalização, ternário e agregação no mesmo problema.',
    topics: [
      { g: 'Como atacar um enunciado longo', t: 'Roteiro em sete passos', h:
        ol(['Leia o texto inteiro uma vez, sem desenhar.', 'Marque os <b>substantivos</b> sobre os quais se guardam dados: candidatos a entidades.', 'Para cada um, marque o que o texto diz que se armazena: atributos.', 'Marque os <b>verbos</b> que ligam duas entidades: relacionamentos.', 'Procure quantidades: “pelo menos um”, “vários”, “somente um”, “nenhum ou vários”: cardinalidades.', 'Procure “pode ser X ou Y”, “categorias”, “apenas estes”: generalização/especialização.', 'Revisão final: há entidade fraca, ternário ou relacionamento que precisa se ligar a outro (agregação)?']) +
        tip('Se um dado só existe depois da associação (data do empréstimo, histórico da cirurgia), ele pertence ao relacionamento ou à entidade que representa o evento.') },
      { g: 'Enunciado 1', t: 'Vídeo Locadora: enunciado com leitura guiada', h: LEG + `<p>${ENL}</p>` },
      { t: 'Vídeo Locadora: decisões de modelagem', h:
        T(['Trecho do texto', 'Decisão'], [
          ['“telefone (residencial e celular)”', 'Atributo multivalorado.'],
          ['“Os filmes possuem gêneros … apenas o código e a descrição”', 'Gênero é entidade (tem atributos próprios). Filme × Gênero: filme com um ou mais gêneros; gênero com nenhum ou vários filmes.'],
          ['“Cada filme possui várias cópias … pelo menos uma cópia … cada cópia contém somente um filme”', 'Filme (1,N) e Cópia (1,1).'],
          ['“O cliente pode realizar empréstimos, ou reservas”', 'Duas entidades distintas: atributos diferentes (devolução e valor x situação e data prevista).'],
          ['“Cada empréstimo ou reserva pode conter vários filmes (cópias)”', 'N:N com Cópia: Empréstimo (1,N) e Reserva (1,N); Cópia (0,N).'],
          ['“quantidade” em Filme', 'Pode ser derivado: contagem das cópias do filme.'],
        ]) },
      { t: 'Vídeo Locadora: DER passo a passo', h: loc(99) + locAttrs },
      { g: 'Enunciado 2', t: 'Base de dados hospitalar: enunciado com leitura guiada', h: LEG + `<p>${ENH}</p>` },
      { t: 'Hospital: corpo hospitalar e chefia', h:
        `<p>O corpo hospitalar (funcionários) é formado por médicos, enfermeiros e administrativo: <b>especialização total</b>. Os médicos ainda se dividem em clínicos e cirurgiões. A chefia tem um período: o relacionamento entre Hospital e Médico ganha atributo de tempo e, ao longo dos anos, um hospital tem vários chefes.</p>` + hosp1 },
      { t: 'Hospital: pacientes, consultas e exames', h:
        `<p>Pacientes são internos ou externos. A <b>consulta</b> associa paciente e médico (com data) e <b>requisita</b> exames: o exame se liga à consulta, não ao paciente ou ao médico isoladamente. Como não se relaciona relacionamento com relacionamento, usa-se a <b>agregação</b>.</p>` + hosp2 +
        note('O enunciado não diz explicitamente que a consulta é com um médico; essa é a leitura mais natural e vale deixá-la explícita na prova.', 'Suposição') },
      { t: 'Hospital: a cirurgia como relacionamento ternário', h:
        `<p>“Paciente, cirurgia e cirurgião representam uma relação necessária”: as três entidades participam juntas do mesmo evento. Um paciente <b>interno</b> pode ser internado várias vezes para cirurgias distintas, e apenas o <b>cirurgião</b> (não o médico clínico) realiza cirurgias. O histórico e a data pertencem ao relacionamento.</p>` + hosp3 },
      { t: 'Hospital: atributos por entidade', h: hospAttrs },
    ],
    examples: [
      { t: 'Locadora passo a passo', d: 'Veja o diagrama da vídeo locadora ser construído em quatro passos.', mount(el) {
        renderStepper(el, { steps: [
          { t: 'Entidades', d: 'Cliente, Filme, Gênero, Cópia, Empréstimo e Reserva.' },
          { t: 'Atributos', d: 'A tabela abaixo do diagrama lista o que cada entidade guarda. Telefone é multivalorado e endereço, composto.' },
          { t: 'Relacionamentos', d: 'Cliente realiza empréstimos e reservas; empréstimos e reservas contêm cópias; filme possui cópias; filme tem gênero.' },
          { t: 'Cardinalidades', d: 'Filme (1,N) × Cópia (1,1). Empréstimo e Reserva (1,N) × Cópia (0,N). Cliente (0,N) × Empréstimo/Reserva (1,1).' },
        ], render: (s) => loc(s) + (s >= 2 ? locAttrs : '') });
      } },
      { t: 'Hospital em três visões', d: 'O diagrama completo seria grande demais. Aqui ele foi dividido em três partes.', mount(el) {
        const V = [['Corpo hospitalar e chefia', hosp1, 'Especialização total do funcionário, especialização do médico e chefia com período.'], ['Pacientes, consultas e exames', hosp2, 'Especialização de paciente e agregação da consulta para requisitar exames.'], ['Cirurgia (ternário)', hosp3, 'Interno, Cirurgia e Cirurgião no mesmo evento, com data e histórico.']];
        el.innerHTML = `<div class="op-tabs" id="tb">${V.map((v, i) => `<button data-i="${i}" aria-pressed="${i === 0}">${v[0]}</button>`).join('')}</div><p id="ds" style="color:var(--muted)"></p><div id="dv"></div>`;
        const upd = (i) => { $$('#tb button', el).forEach((b) => b.setAttribute('aria-pressed', +b.dataset.i === i)); $('#ds', el).textContent = V[i][2]; $('#dv', el).innerHTML = V[i][1]; };
        $$('#tb button', el).forEach((b) => b.onclick = () => upd(+b.dataset.i)); upd(0);
      } },
    ],
    activities: [
      { t: 'Confira o seu DER da locadora', d: 'Modele primeiro e depois marque o que o seu diagrama tem.', kind: 'check',
        cfg: { items: ['Entidades Cliente, Filme, Gênero, Cópia, Empréstimo e Reserva.', 'Telefone de Cliente como atributo multivalorado.', 'Filme (1,N) e Cópia (1,1).', 'Filme × Gênero ligado por relacionamento próprio.', 'Empréstimo e Reserva como entidades separadas, cada uma com seus atributos.', 'Empréstimo e Reserva N:N com Cópia, com mínimo 1 do lado do empréstimo/reserva.', 'Cliente (0,N) realiza e Empréstimo/Reserva (1,1).', 'Situação da reserva como atributo de Reserva.'] } },
      { t: 'Confira o seu DER do hospital', d: 'Este é o mais completo: procure os quatro recursos avançados.', kind: 'check',
        cfg: { items: ['Chefia entre Hospital e Médico, com período de tempo.', 'Funcionário especializado em Médico, Enfermeiro e Administrativo (total).', 'Médico especializado em Clínico e Cirurgião.', 'Paciente especializado em Interno e Externo.', 'Consulta como agregação entre Paciente e Médico, ligada a Exame.', 'Ternário entre Interno, Cirurgia e Cirurgião, com data e histórico.', 'Cirurgia ligada ao Cirurgião (e não ao Médico em geral).', 'Endereço de Hospital e de Funcionário como atributos compostos.'] } },
      { t: 'Perguntas de discussão', d: 'Cada uma testa uma decisão difícil dos dois enunciados.', kind: 'qa', items: [
        ['Cópia deve ser entidade ou atributo de Filme?', '<p>Entidade: cada cópia tem código próprio e é emprestada ou reservada individualmente. Isso também permite calcular “quantidade” por contagem.</p>'],
        ['Empréstimo e Reserva podem ser uma entidade só?', '<p>Poderiam, com generalização, mas os atributos diferem (devolução e valor x situação e data prevista). Como o enunciado os trata como coisas distintas, duas entidades são mais diretas.</p>'],
        ['Por que a cirurgia se liga ao Cirurgião e não ao Médico?', '<p>O enunciado diz que apenas os cirurgiões realizam cirurgias. Ligar a Médico permitiria que clínicos operassem, o que contraria a regra.</p>'],
        ['Por que usar agregação em consulta e exame?', '<p>Os exames são requisitados por consultas. A consulta já é um relacionamento entre paciente e médico; para ligá-la a Exame, a agregação a transforma em entidade associativa.</p>'],
        ['Por que a chefia tem atributo de tempo?', '<p>O hospital é chefiado por um médico “num dado período”. Ao longo do tempo há vários chefes, então o relacionamento é N:N com atributo de período.</p>'],
      ] },
    ],
    challenges: [
      { stem: 'Na vídeo locadora, “cada filme possui várias cópias; para cada filme há pelo menos uma cópia e cada cópia contém somente um filme”. Quais são as cardinalidades de Filme e de Cópia, respectivamente, no relacionamento?',
        opts: ['(0,N) e (0,N)', '(1,N) e (1,1)', '(1,1) e (1,N)', '(0,1) e (1,1)', '(1,N) e (0,1)'], c: 1,
        e: '<p>Filme: pelo menos uma cópia e várias → (1,N). Cópia: contém somente um filme → (1,1).</p>', w: ['Nas demais, mínimos ou máximos não correspondem ao texto.'] },
      { stem: 'Na locadora, a entidade Filme possui o atributo quantidade. Se o modelo também representa cada Cópia como uma entidade relacionada ao Filme, o atributo quantidade pode ser obtido contando as cópias de cada filme. Nesse caso, quantidade é um atributo:',
        opts: ['Multivalorado.', 'Identificador.', 'Derivado.', 'Composto.', 'Fraco.'], c: 2,
        e: '<p>Um atributo cujo valor se calcula a partir de outros dados do modelo é derivado.</p>', w: ['Multivalorado teria vários valores; identificador distingue ocorrências; composto tem partes; “fraco” se aplica a entidades.'] },
      { stem: 'No enunciado do hospital, o corpo hospitalar “é formado basicamente por três categorias: médicos, enfermeiros e administrativo”. Qual recurso do modelo E-R representa essa situação?',
        opts: ['Auto-relacionamento em Funcionário.', 'Atributo multivalorado em Funcionário.', 'Especialização de Funcionário em Médico, Enfermeiro e Administrativo.', 'Relacionamento ternário entre as três categorias.', 'Entidade fraca de Hospital.'], c: 2,
        e: '<p>Categorias com atributos próprios que herdam os do funcionário caracterizam uma generalização/especialização.</p>', w: ['Auto-relacionamento liga a entidade a ela mesma; ternário envolve três entidades no mesmo evento; entidade fraca depende de identificação externa.'] },
      { stem: 'No hospital, médicos podem ser clínicos ou cirurgiões, e apenas cirurgiões realizam cirurgias. Para respeitar essa regra no DER, o relacionamento com a entidade Cirurgia deve ser ligado a:',
        opts: ['Médico', 'Funcionário', 'Clínico', 'Cirurgião', 'Hospital'], c: 3,
        e: '<p>Somente a entidade especializada Cirurgião participa do relacionamento; assim, clínicos ficam de fora.</p>', w: ['Ligar a Médico ou Funcionário permitiria que clínicos e outros realizassem cirurgias.'] },
      { stem: 'Ainda no hospital, “paciente, cirurgia e cirurgião representam uma relação necessária”: o paciente interno pode ser internado várias vezes para cirurgias distintas. Qual estrutura modela esse fato?',
        opts: ['Três relacionamentos binários independentes.', 'Um relacionamento ternário entre Interno, Cirurgia e Cirurgião.', 'Um auto-relacionamento em Paciente.', 'Um atributo multivalorado em Cirurgia.', 'Uma especialização parcial de Cirurgia.'], c: 1,
        e: '<p>As três entidades participam do mesmo evento; separar em binários perderia a informação de quem operou quem em qual cirurgia.</p>', w: ['As demais alternativas não conectam as três entidades no mesmo fato.'] },
      { stem: 'No hospital, as consultas requisitam exames. Como a consulta é o relacionamento entre Paciente e Médico, e não é permitido ligar um relacionamento diretamente a uma entidade por outro relacionamento, qual recurso resolve?',
        opts: ['Generalização total.', 'Entidade fraca.', 'Agregação (entidade associativa) sobre Consulta.', 'Atributo derivado em Exame.', 'Auto-relacionamento em Médico.'], c: 2,
        e: '<p>A agregação trata a Consulta como entidade, permitindo relacioná-la a Exame.</p>', w: ['Nenhuma das outras cria ligação entre um relacionamento e uma entidade.'] },
    ],
  });
})();
