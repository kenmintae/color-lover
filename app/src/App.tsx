import React from 'react';
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import initApollo from "apollo/initApollo";
import theme from "constants/theme";
import GlobalStyles from "constants/globalStyles"
import Routes from "./AppRoutes";
import AppLayout from "./containers/AppLayout";
import SwatchesProvider from "contexts/SwatchesProvider";
import CartProvider from "contexts/CartProvider";

function App() {
  const client = initApollo();
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <BrowserRouter>
            <SwatchesProvider>
              <CartProvider>
                <AppLayout>
                  <Routes />
                </AppLayout>
              </CartProvider>
            </SwatchesProvider>
          </BrowserRouter>
        </>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
