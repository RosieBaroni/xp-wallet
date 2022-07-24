# Projeto XP Wallet

Neste projeto foi desenvolvido um aplicativo de investimento em ações, com algumas funcionalidades de conta digital, sendo elas:

- Realizar login;
- Visualizar a tabela com ações disponíveis para negociação;
- Visualizar a tabela com ações da carteira do usuário;
- Compra/Venda das ações da carteira do usuário;
- Visualizar o saldo disponível;
- Depositar/Retirar saldo.

[Acessar projeto em produção](https://xp-wallet-eta.vercel.app/)

![](./xp-wallet.gif)

## Desenvolvimento

Este projeto foi desenvolvido como desafio técnico proposto pela XP Inc.

Nesta aplicação foi utilizado o React com componentes funcionais e faz uso do localStorage para o armazenamento dos dados localmente.

A aplicação faz uso dos dados disponíveis no site da [Yahoo finance](https://finance.yahoo.com/quote/%5EBVSP/components?p=%5EBVSP) que foram mockados em um JSON. 

Para a formatação monetária foi utilizado o método `Intl.NumberFormat` (que faz parte da API de internacionalização do ECMAScript) que formata um número de acordo com a localidade e as opções de formatação.

## Habilidades

- React functional component;
- React Hook `useState`;
- React Hook `useEffect`;
- React Router Hook `useNavigate`;
- React Router Hook `useParams`;
- BEM CSS;
- Mobile first;
- Deploy Vercel.

## Para rodar a aplicação

### Clone o repositório:

- `git clone git@github.com:RosieBaroni/xp-wallet.git`
- Entre na pasta do repositório que você acabou de clonar:
  - `cd xp-wallet`
- Instale as dependências:
  - `npm install`
- Inicialize o projeto:
  - `npm start` (uma nova página deve abrir no seu navegador com a aplicação XP Wallet).

### Ou acesse o link em produção: 

[Acessar projeto em produção](https://xp-wallet-eta.vercel.app/)