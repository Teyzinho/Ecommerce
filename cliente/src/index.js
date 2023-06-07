import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme"
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./state"

// Configura a loja Redux com o redutor (reducer) "cartReducer"
const store = configureStore({
  reducer: { cart: cartReducer },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
     <Provider store={store}> {/*Provider para disponibilizar a loja Redux para os componentes */}
      <ThemeProvider theme={theme}> {/* Provider para disponibilizar o tema Material-UI para os componentes*/}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
