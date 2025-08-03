### Projeto Frontend Challenge

Este projeto é um desafio de frontend que consiste no desenvolvimento de uma aplicação web para listagem e detalhamento de personagens de quadrinhos, utilizando a API oficial da Marvel. O objetivo principal é criar uma SPA (Single Page Application) com React, permitindo ao usuário visualizar personagens, pesquisar por nome, ordenar resultados e gerenciar uma lista de favoritos com limite de até cinco personagens.

A aplicação conta com duas páginas principais: uma de listagem, onde são exibidos os personagens e opções de filtro, ordenação e favoritos; e uma de detalhes, que apresenta informações completas do personagem selecionado, incluindo seus últimos quadrinhos lançados. O layout e a estrutura seguem as orientações fornecidas na pasta de assets do desafio.

Além dos requisitos funcionais, o projeto prioriza boas práticas de código, organização, responsividade e experiência do usuário. O código está disponível neste repositório para avaliação, com instruções claras para instalação e execução.

## Como instalar, testar e executar o projeto

### Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

### Execução

Para rodar o projeto localmente:

```sh
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

# Gerenciamento de Favoritos com Limite

Implementação de um sistema de favoritos com limite máximo de 5 itens usando Redux ou Zustand.

## Redux (Redux Toolkit)

```javascript
// favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    maxLimit: 5,
  },
  reducers: {
    addFavorite: (state, action) => {
      if (state.items.length >= state.maxLimit) return;
      if (!state.items.some((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
```
