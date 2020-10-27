import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CSSReset, theme } from "@chakra-ui/core";
import { ThemeProvider } from "emotion-theming";
import Login from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/chat" component={ChatPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
