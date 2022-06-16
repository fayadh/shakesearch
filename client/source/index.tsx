import * as serviceWorker from './serviceWorker';

import { BreadcrumbsProvider } from '@common/providers/breadcrumbsProvider';

import DateAdapter from '@mui/lab/AdapterMoment';
import ErrorBoundary from '@common/components/ErrorBoundary';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Pages } from '@layouts/Pages';
import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { Theme } from '@common/theme';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => (
    <BreadcrumbsProvider>
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
    </BreadcrumbsProvider>
);

(async () => {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.querySelector('#root'),
  );
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
