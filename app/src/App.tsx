import React from 'react';
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import theme from "constants/theme";
import Routes from "./routes";
import AppLayout from "./containers/AppLayout"
import { ApolloProvider } from "@apollo/react-hooks"
import initApollo from "apollo/initApollo";

function App() {
  const client = initApollo();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppLayout>
          <ApolloProvider client={client}>
            <Routes />
          </ApolloProvider>
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
