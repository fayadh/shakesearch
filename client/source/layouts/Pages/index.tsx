import React from "react";

import { Route, Switch } from "react-router-dom";

import ErrorBoundary from "@common/components/ErrorBoundary";
import { Search } from "@pages/Search";
import { NotFound } from "@pages/NotFound";

import { PageContainer } from "./PageContainer";
import { routes } from "./Routes/utils";
import { PagesWrapper } from "./Wrapper";

/**
 * Returns navigable pages.
 */
export const Pages: React.FC = () => {
  return (
    <PagesWrapper>
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
    </PagesWrapper>
  );
};
