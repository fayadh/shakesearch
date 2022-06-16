/* eslint-disable max-lines-per-function */
import React from 'react';

import { Route, Switch } from 'react-router-dom';

import ErrorBoundary from '@common/components/ErrorBoundary';
import { Search } from '@pages/Search';
import { NotFound } from '@pages/NotFound';

import { PageContainer } from './PageContainer';
import { routes } from './Routes/utils';
import { Wrapper } from './Wrapper';

/**
 * Returns authorized navigation links and pages.
 */
export const Pages: React.FC = () => {
  return (
    <Wrapper>
      <PageContainer>
        <ErrorBoundary>
          <Switch>
            <Route path={routes.search.path}>
              <Search />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </ErrorBoundary>
      </PageContainer>
    </Wrapper>
  );
};
