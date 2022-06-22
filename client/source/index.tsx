import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";
import DateAdapter from "@mui/lab/AdapterMoment";
import ErrorBoundary from "@common/components/ErrorBoundary";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Pages } from "@layouts/Pages";
import React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { Theme } from "@common/theme";
import { render } from "react-dom";

const App: React.FC = () => (
  <BrowserRouter basename="/">
    <Theme>
      <StyledEngineProvider injectFirst>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <ErrorBoundary>
            <Pages />
          </ErrorBoundary>
        </LocalizationProvider>
      </StyledEngineProvider>
    </Theme>
  </BrowserRouter>
);

(async () => {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.querySelector("#root")
  );
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
