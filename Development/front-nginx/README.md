# Rh_front - Web

![version](https://img.shields.io/badge/version-1.8.0-blue.svg?cacheSeconds=2592000)
![node](https://img.shields.io/badge/node-%3E%3D%208.0.0-green.svg)
![coverage](https://img.shields.io/badge/coverage-52.94%25-lightgrey.svg)
![jest](https://img.shields.io/badge/jest-4%20skipped%2C%20397%20passed-green.svg)


## :rocket: Getting Started :rocket:

#### Pré-requisitos:

- [Brew](https://brew.sh/index_pt-br) ( para usuários mac )
- [Versão 8 do node.](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install#mac-stable)

-> **Atenção**: SEMPRE utilizar o YARN. Usar o NPM pode causar problemas nos builds do projeto.

## :rocket: Setup & Run :rocket:

#### Antes de iniciar o desenvolvimento:

Instale as dependências:
```sh
yarn
```

Inicie o projeto:
```sh
yarn start:web
```

O projeto rodará na url: [http://localhost:8080/](http://localhost:8080/)


## :recycle: Fluxo de Rebase :recycle:

Dê commit ou stash das suas alterações e mude para a branch `teste_blue`:
```sh
git checkout teste_blue
```

Atualize sua branch `teste_blue`com o conteúdo do repositório original:
```sh
git pull <nome_do_remote> teste_blue
```

Volte para sua branch com as alterações:
```sh
git checkout <nome_da_branch>
```

Dê rebase para aplicar as atualizações à sua branch:
```sh
git rebase teste_blue
```

Resolva os conflitos e rode os testes para ter certeza de que nada foi quebrado:
```sh
npm run test
```

Suba sua branch para seu remote (por padrão `origin`)
```sh
git push origin <nome_da_branch>
```

No GitLab abra um merge request da sua branch para a branch `teste_blue` do repositório original.


## Git
Para nomes de branch o padrão sugerido é:
tipo/nome-da-atividade

Onde tipo deve ser relacionado ao que aquela branch busca resolver.

Os tipos que estamos utilizando são:
- feat (será implementada uma nova funcionalidade)
- fix (será implementada uma correção para resolver um problema existente)
- refactor (será realizado algum refactor em parte do código que já funciona)
- chore (será implementa alguma melhoria de infraestrutura ou soluções mais gerais que não são features)
- test (será desenvolvido algum novo cenário de teste para a aplicação ou atualização de testes existentes)
- docs (será feita alguma mudança na documentação)

Para as mensagens de commit também deve-se seguir a nomenclatura:
 tipo(nome-da-atividade): mensagem

## Git Flow

Para mais informações sobre o nosso fluxo de git seguir a documentação do [Git Flow](./CONTRIBUTING.md)

## :heavy_check_mark:  Rodar os testes:

```sh
yarn test
```

#### :sparkles:  Atualizando Snapshots

```sh
yarn test -u
```

## Deploy

Existem 4 diferentes environments: dev, qa, staging e prod.
