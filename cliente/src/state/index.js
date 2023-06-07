import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartOpen: false, // Estado inicial do carrinho (fechado)
  cart: [], // Array vazio para armazenar os itens do carrinho
  items: [], // Array vazio para armazenar todos os itens disponíveis
};

export const cartSlice = createSlice({
  name: 'cart', // Nome do "slice"
  initialState, // Estado inicial
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload; // Define os itens disponíveis com base na ação recebida
    },

    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.item]; // Adiciona um item ao carrinho
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id); // Remove um item do carrinho com base no ID recebido
    },

    increaseCout: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++; // Aumenta a quantidade de um item no carrinho com base no ID recebido
        }
        return item;
      });
    },

    decreaseCout: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--; // Diminui a quantidade de um item no carrinho com base no ID recebido, desde que a quantidade seja maior que 1
        }
        return item;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen; // Inverte o estado do carrinho entre aberto e fechado
    },
  },
});

// Extrai as funções de ação do "slice" para serem usadas diretamente
export const {
  setItems,
  addToCart,
  removeFromCart,
  decreaseCout,
  increaseCout,
  setIsCartOpen,
} = cartSlice.actions;

// Exporta o redutor (reducer) do "slice"
export default cartSlice.reducer;

//o código é a criação de um "slice" no Redux usando a biblioteca "@reduxjs/toolkit". 
//Um "slice" é uma parte do estado global do Redux que contém o estado e as funções para atualizá-lo.