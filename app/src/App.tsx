import React from 'react';
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import initApollo from "apollo/initApollo";
import theme from "constants/theme";
import Routes from "./routes";
import AppLayout from "./containers/AppLayout"


function App() {
  const client = initApollo();
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppLayout>
            <Routes />
          </AppLayout>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
