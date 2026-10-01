# Banco de Dados · Revisão por aula

Site de revisão de Banco de Dados com um módulo por aula. Cada módulo tem **Conteúdo**, **Exemplos práticos**, **Atividades** e **Desafios** (questões autorais de múltipla escolha).

## Estrutura

```
index.html          página única do site
css/style.css       estilos (tema claro e escuro)
js/lib.js           diagramas E-R, quizzes e widgets
js/app.js           navegação, busca e telas
js/main.js          inicia o site
js/gifs.js          caminhos das animações
js/modulos/         conteúdo de cada aula
  m1.js             Aula 1  · Apresentação
  m2.js             Aula 2  · Introdução a BD e SGBD
  m3.js             Aula 3  · Modelo entidade-relacionamento
  m4.js             Aula 4  · Prática E-R (Biblioteca)
  m5p.js            Aula 5  · Prática E-R (Locadora e Hospital)
  m5l.js            Aula 5  · Modelo lógico e mapeamento
  mfn.js            Normalização (dependências funcionais e formas normais)
  m9.js             Aula 9  · Modelo físico e DDL
  m10.js            Aula 10 · DML
  m11.js            Aula 11 · DQL (consultas)
  m13.js            Aula 13 · Subconsultas e funções
  m14.js            Aula 14 · Joins externos e operações com conjuntos
  m15.js            Aula 15 · SQL avançada (views, procedures, functions, triggers)
assets/gifs/        animações
```

## Como editar

- **Texto, tópicos, atividades e questões:** edite o arquivo da aula em `js/modulos/`.
  Cada módulo tem as listas `topics`, `examples`, `activities` e `challenges`.
- **Novo módulo:** crie um arquivo em `js/modulos/`, use `MODULES.push({...})` como nos existentes (campo `grp` define a seção da lista) e adicione o `<script>` no `index.html`, antes de `js/app.js`.
- **Nova questão:** acrescente um item em `challenges` com `stem` (enunciado), `opts` (alternativas),
  `c` (índice da correta, começando em 0), `e` (explicação) e `w` (comentário sobre as erradas, opcional).
- **Cores e fontes:** `css/style.css`, no início do arquivo.

## Publicar no GitHub Pages

1. Envie todos os arquivos para a raiz de um repositório público.
2. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Observações

- O progresso dos desafios fica salvo no navegador de cada aluno (localStorage).
- Testar localmente: na pasta do projeto, `python3 -m http.server 8000` e abrir http://localhost:8000.
