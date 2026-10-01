(function () {
  const bib = (step) => er({ step, ls: 4, w: 900, h: 620, minw: 760, alt: 'Diagrama entidade-relacionamento da Biblioteca', nodes: [
    { id: 'livro', t: 'e', l: 'Livro', x: 130, y: 150 }, { id: 'exemplar', t: 'e', l: 'Exemplar', x: 460, y: 150, ws: 5 }, { id: 'estante', t: 'e', l: 'Estante', x: 780, y: 150 },
    { id: 'usuario', t: 'e', l: 'Usuário', x: 130, y: 470 }, { id: 'emprest', t: 'e', l: 'Empréstimo', x: 460, y: 470 },
    { id: 'isbn', t: 'a', l: 'ISBN', k: 1, s: 2, x: 50, y: 66 }, { id: 'titulo', t: 'a', l: 'título', s: 2, x: 145, y: 46 }, { id: 'edit', t: 'a', l: 'editora', s: 2, x: 240, y: 66 }, { id: 'autores', t: 'a', l: 'autores', s: 2, x: 130, y: 240, up: [5, { m: 1 }] },
    { id: 'seq', t: 'a', l: 'sequência', s: 2, x: 390, y: 62, up: [5, { p: 1 }] }, { id: 'dtaq', t: 'a', l: 'data_aquisição', s: 2, x: 530, y: 62 },
    { id: 'cod', t: 'a', l: 'código', k: 1, s: 2, x: 725, y: 62 }, { id: 'cat', t: 'a', l: 'categoria', s: 2, x: 835, y: 62 },
    { id: 'cpf', t: 'a', l: 'cpf', k: 1, s: 2, x: 50, y: 555 }, { id: 'nome', t: 'a', l: 'nome', s: 2, x: 130, y: 570 }, { id: 'end', t: 'a', l: 'endereço', s: 2, x: 235, y: 555 },
    { id: 'rua', t: 'a', l: 'rua', s: 5, x: 170, y: 605 }, { id: 'num', t: 'a', l: 'número', s: 5, x: 240, y: 605 }, { id: 'bai', t: 'a', l: 'bairro', s: 5, x: 315, y: 605 },
    { id: 'data', t: 'a', l: 'data', s: 2, x: 460, y: 560 },
    { id: 'possui', t: 'r', l: 'possui', s: 3, x: 295, y: 150 }, { id: 'guarda', t: 'r', l: 'alocado em', s: 3, x: 620, y: 150 }, { id: 'realiza', t: 'r', l: 'realiza', s: 3, x: 295, y: 470 }, { id: 'envolve', t: 'r', l: 'envolve', s: 3, x: 460, y: 310 },
  ], edges: [
    ['livro', 'isbn'], ['livro', 'titulo'], ['livro', 'edit'], ['livro', 'autores'], ['exemplar', 'seq'], ['exemplar', 'dtaq'], ['estante', 'cod'], ['estante', 'cat'],
    ['usuario', 'cpf'], ['usuario', 'nome'], ['usuario', 'end'], ['end', 'rua'], ['end', 'num'], ['end', 'bai'], ['emprest', 'data'],
    ['livro', 'possui', '(1,N)'], ['possui', 'exemplar', '', '(1,1)'], ['exemplar', 'guarda', '(1,1)'], ['guarda', 'estante', '', '(0,N)'],
    ['usuario', 'realiza', '(0,N)'], ['realiza', 'emprest', '', '(1,1)'], ['emprest', 'envolve', '(1,N)'], ['envolve', 'exemplar', '', '(0,N)'],
  ] });
  const ENUN = 'Uma biblioteca deseja criar um banco de dados para automatizar seus processos. Para cada <mark class="e">livro</mark> será armazenado o seu <mark class="a">título</mark>, a <mark class="a">editora</mark> que o publicou, o seu número de <mark class="a">ISBN</mark> e os seus <mark class="a">autores</mark>. <mark class="c">Cada livro tem um valor diferente para o ISBN.</mark> Os livros <mark class="r">possuem</mark> <mark class="e">exemplares</mark>, que possuem uma <mark class="a">sequência de identificação</mark> e a <mark class="a">data de aquisição</mark>. Cada <mark class="e">usuário</mark> da biblioteca é descrito por um <mark class="a">nome</mark>, <mark class="a">cpf</mark> e <mark class="a">endereço</mark>. <mark class="c">O endereço é composto por rua, número e bairro.</mark> Cada <mark class="e">empréstimo</mark> realizado na biblioteca <mark class="r">é feito por um usuário</mark> e <mark class="r">pode envolver um ou mais exemplares</mark>. Para cada empréstimo é guardada a <mark class="a">data</mark> em que foi realizado o empréstimo. Os exemplares <mark class="r">são alocados em</mark> <mark class="e">estantes</mark>. Cada estante é identificada por um <mark class="a">código</mark> e pela <mark class="a">categoria</mark> dos livros que são armazenados na estante.';
  const LEG = '<div class="legend"><mark class="e">entidade</mark><mark class="a">atributo</mark><mark class="r">relacionamento</mark><mark class="c">pista de identificador ou tipo de atributo</mark></div>';

  MODULES.push({
    id: 'a4', acc: 'yel', short: 'Prática E-R: Biblioteca',
    title: 'Prática de modelagem E-R: a Biblioteca',
    blurb: 'Como sair de um enunciado em texto até o diagrama completo, passo a passo, usando o caso da biblioteca. Inclui o roteiro de leitura e um conferidor para o seu DER.',
    topics: [
      { g: 'Ferramenta', t: 'brModelo', h:
        `<p>Ferramenta gratuita para desenhar modelos conceituais e lógicos. Para usar: acesse o link, baixe o arquivo e rode o executável. Funciona em todos os sistemas operacionais.</p><p><a href="https://sourceforge.net/projects/brmodelo/" target="_blank" rel="noopener">sourceforge.net/projects/brmodelo</a></p>` },
      { g: 'O enunciado', t: 'Enunciado da biblioteca com leitura guiada', h:
        `<p>Repare como o texto entrega o modelo quase pronto. As cores mostram o que cada trecho vira.</p>${LEG}<p>${ENUN}</p>` +
        note('Há uma ambiguidade: “identificada por um código e pela categoria” pode indicar chave composta. A leitura mais comum é código como identificador e categoria como atributo. Em prova, deixe explícita a sua suposição.', 'Atenção') },
      { g: 'Passo a passo', t: 'Passo 1: encontre as entidades', h:
        `<p>Procure as “coisas” sobre as quais o texto quer guardar informações. Aqui: <b>Livro, Exemplar, Usuário, Empréstimo e Estante</b>.</p>` + ul(['Biblioteca é o mini-mundo, não uma entidade.', 'Autores e editora aparecem como características do livro. Poderiam virar entidades, mas o enunciado só pede o nome deles, então tratamos como atributos.']) },
      { t: 'Passo 2: liste os atributos de cada entidade', h:
        T(['Entidade', 'Atributos', 'Observação'], [['Livro', 'ISBN, título, editora, autores', 'ISBN identifica; autores é multivalorado'], ['Exemplar', 'sequência, data de aquisição', 'a sequência só identifica dentro de um livro'], ['Usuário', 'cpf, nome, endereço', 'endereço é composto (rua, número, bairro)'], ['Empréstimo', 'data', ''], ['Estante', 'código, categoria', 'código identifica']]) },
      { t: 'Passo 3: ligue as entidades com relacionamentos', h:
        T(['Trecho do texto', 'Relacionamento'], [['“Os livros possuem exemplares”', 'Livro possui Exemplar'], ['“Os exemplares são alocados em estantes”', 'Exemplar alocado em Estante'], ['“empréstimo … é feito por um usuário”', 'Usuário realiza Empréstimo'], ['“pode envolver um ou mais exemplares”', 'Empréstimo envolve Exemplar']]) },
      { t: 'Passo 4: marque as cardinalidades', h:
        T(['Relacionamento', 'Lado 1', 'Lado 2', 'Justificativa'], [
          ['Livro possui Exemplar', 'Livro (1,N)', 'Exemplar (1,1)', 'Um livro tem exemplares; cada exemplar é de um só livro.'],
          ['Exemplar alocado em Estante', 'Exemplar (1,1)', 'Estante (0,N)', 'Cada exemplar fica em uma estante; uma estante pode estar vazia ou ter vários.'],
          ['Usuário realiza Empréstimo', 'Usuário (0,N)', 'Empréstimo (1,1)', 'Empréstimo é feito por exatamente um usuário; usuário pode não ter feito nenhum.'],
          ['Empréstimo envolve Exemplar', 'Empréstimo (1,N)', 'Exemplar (0,N)', 'Um empréstimo envolve um ou mais exemplares; um exemplar pode ser emprestado várias vezes ao longo do tempo. É N:N.'],
        ]) },
      { t: 'Passo 5: refine (fraca, composto, multivalorado)', h:
        boxes([['Exemplar é entidade fraca', 'Tem apenas uma sequência de identificação, que só faz sentido dentro de um livro. Chave = ISBN + sequência.'], ['Endereço é composto', 'Rua, número e bairro.'], ['Autores é multivalorado', 'Um livro pode ter vários autores. (Alternativa: criar a entidade Autor com relacionamento N:N.)']], 'grid3') },
      { t: 'DER completo da biblioteca', h: bib(99) + `<p>Uma solução possível. Dependendo da leitura do enunciado, as cardinalidades podem variar; o importante é justificar cada escolha.</p>` },
      { g: 'Entrega', t: 'Atividade para entrega: modelagem E-R', h: `<p>O arquivo com as atividades de modelagem E-R está disponível no Classroom. Use o brModelo e compare o seu diagrama com o conferidor na aba <b>Atividades</b>.</p>` },
    ],
    examples: [
      { t: 'Monte o DER da biblioteca passo a passo', d: 'Avance pelos cinco passos e veja o diagrama crescer.', mount(el) {
        renderStepper(el, { steps: [
          { t: 'Entidades', d: 'Substantivos sobre os quais se guarda informação: Livro, Exemplar, Usuário, Empréstimo e Estante.' },
          { t: 'Atributos', d: 'Características de cada entidade. ISBN, código e cpf são identificadores (sublinhados).' },
          { t: 'Relacionamentos', d: 'Os verbos do texto ligam as entidades: possui, alocado em, realiza, envolve.' },
          { t: 'Cardinalidades', d: 'Leia cada par (mín,máx) ao lado da entidade. Empréstimo × Exemplar é N:N.' },
          { t: 'Refinamentos', d: 'Exemplar vira entidade fraca (borda dupla, sequência como discriminador), autores é multivalorado e endereço ganha suas partes.' },
        ], render: (s) => bib(s) });
      } },
    ],
    activities: [
      { t: 'Confira o seu DER', d: 'Depois de modelar no brModelo (ou no papel), marque o que o seu diagrama já tem.', kind: 'check',
        cfg: { items: ['Cinco entidades: Livro, Exemplar, Usuário, Empréstimo e Estante.', 'ISBN sublinhado como identificador de Livro.', 'Autores tratado como multivalorado (ou entidade Autor com N:N).', 'Exemplar com sequência e data de aquisição, e identificado em relação ao Livro (entidade fraca).', 'Endereço do Usuário como atributo composto (rua, número, bairro).', 'cpf como identificador de Usuário.', 'Empréstimo com o atributo data.', 'Empréstimo × Exemplar como N:N (um empréstimo envolve um ou mais exemplares).', 'Cada empréstimo ligado a exatamente um usuário: Empréstimo (1,1).', 'Estante com código (identificador) e categoria.', 'Exemplar alocado em uma estante: Exemplar (1,1) e Estante (0,N).', 'Todas as cardinalidades preenchidas com (mín,máx).'] } },
      { t: 'Perguntas sobre o enunciado', d: 'Extraia informações do texto e depois compare.', kind: 'qa', items: [
        ['Por que “Biblioteca” não é uma entidade?', '<p>É o mini-mundo: o contexto do banco. O sistema não precisa guardar dados “da biblioteca” (há uma só), e sim dos livros, usuários, empréstimos etc.</p>'],
        ['O que a frase “Cada livro tem um valor diferente para o ISBN” me diz?', '<p>Que o ISBN é único por livro e, portanto, serve como atributo identificador.</p>'],
        ['Um exemplar pode existir sem livro? Como isso se reflete no modelo?', '<p>Não: o exemplar só é identificado dentro de um livro. Por isso é entidade fraca de Livro, com participação (1,1) no relacionamento.</p>'],
        ['Um exemplar pode aparecer em mais de um empréstimo?', '<p>Sim, ao longo do tempo. Por isso Empréstimo × Exemplar é N:N, com Exemplar (0,N): pode nunca ter sido emprestado.</p>'],
        ['Onde fica a data do empréstimo?', '<p>Como Empréstimo é uma entidade, a data é atributo dela. Só seria atributo do relacionamento se Empréstimo fosse modelado apenas como a associação Usuário-Exemplar.</p>'],
      ] },
    ],
    challenges: [
      { stem: 'No enunciado da biblioteca, lê-se: “O endereço é composto por rua, número e bairro.” No DER, como o atributo endereço do usuário deve ser representado?',
        opts: ['Atributo derivado.', 'Atributo multivalorado.', 'Atributo composto.', 'Atributo identificador.', 'Entidade fraca.'], c: 2,
        e: '<p>Atributo composto é o que pode ser dividido em subpartes com significado próprio.</p>', w: ['Não é calculado de outro (derivado), não tem conjunto de valores (multivalorado) e não identifica o usuário.'] },
      { stem: 'Em um modelo de biblioteca, cada exemplar possui apenas uma sequência de identificação e uma data de aquisição, e só é identificável em conjunto com o livro ao qual pertence. Como Exemplar deve ser modelado?',
        opts: ['Entidade forte, com a sequência como chave primária.', 'Entidade fraca de Livro, cuja identificação combina a chave de Livro com a sequência.', 'Atributo multivalorado de Livro.', 'Especialização parcial de Livro.', 'Relacionamento ternário.'], c: 1,
        e: '<p>A sequência não identifica o exemplar sozinha; a chave é ISBN + sequência. Isso caracteriza entidade fraca.</p>', w: ['Com a sequência sozinha como chave haveria repetições entre livros diferentes.'] },
      { stem: 'Um empréstimo pode envolver um ou mais exemplares, e um exemplar pode ser emprestado várias vezes ao longo do tempo. Qual é a cardinalidade máxima do relacionamento entre Empréstimo e Exemplar?',
        opts: ['1:1', '1:N com Exemplar do lado N', '1:N com Empréstimo do lado N', 'N:N', 'Não há relacionamento, apenas herança.'], c: 3,
        e: '<p>Ambos os lados admitem vários: N:N. Em cada empréstimo, vários exemplares; em cada exemplar, vários empréstimos ao longo do tempo.</p>', w: ['1:1 e 1:N ignoram a possibilidade de vários em um dos lados.'] },
      { stem: 'No enunciado, “cada livro tem um valor diferente para o ISBN”. Que informação de modelagem essa frase fornece?',
        opts: ['ISBN é atributo multivalorado.', 'ISBN é atributo derivado.', 'ISBN pode ser usado como atributo identificador de Livro.', 'Livro é entidade fraca.', 'ISBN pertence ao relacionamento entre Livro e Exemplar.'], c: 2,
        e: '<p>Valores distintos para cada ocorrência caracterizam um identificador (chave).</p>', w: ['Nenhuma das outras interpretações decorre da frase.'] },
      { stem: 'Sobre o relacionamento entre Usuário e Empréstimo: cada empréstimo é feito por exatamente um usuário, e um usuário pode nunca ter feito empréstimo ou ter feito vários. Quais são as cardinalidades de Usuário e Empréstimo, respectivamente?',
        opts: ['(1,1) e (0,N)', '(0,N) e (1,1)', '(1,N) e (1,N)', '(0,1) e (0,N)', '(1,1) e (1,1)'], c: 1,
        e: '<p>Usuário: mínimo 0 e máximo N → (0,N). Empréstimo: exatamente um usuário → (1,1).</p>', w: ['A inverte os lados; as demais alteram mínimos ou máximos contrariando o texto.'] },
      { stem: 'Um livro pode ter vários autores. Qual das opções representa adequadamente essa informação no modelo conceitual?',
        opts: ['Atributo autores como multivalorado em Livro, ou entidade Autor ligada a Livro por N:N.', 'Atributo autor simples em Livro, repetindo o livro para cada autor.', 'Atributo derivado em Livro.', 'Generalização total de Livro em Autor.', 'Nenhuma forma; só é possível um autor por livro.'], c: 0,
        e: '<p>Multivalorado resolve quando basta guardar o nome. Se for preciso guardar dados dos autores, vira entidade com N:N.</p>', w: ['B provoca redundância; C, D e E não fazem sentido para o caso.'] },
    ],
  });
})();
