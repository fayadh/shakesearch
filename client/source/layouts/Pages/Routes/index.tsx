/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';

import { routes } from './utils';
import { Route } from 'react-router';

interface IPublicRoutesProps {
  isAuthenticated: boolean;
}

export const Routes: React.FC<IPublicRoutesProps> = () => (
  <>
    {Object.values(routes).map(({ path, component: Component }) => (
      <Route path={path}>
        <Component />
      </Route>
    ))}
  </>
);
