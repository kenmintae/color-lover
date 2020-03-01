import React from 'react';
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import theme from "constants/theme";
import Routes from "./routes"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
