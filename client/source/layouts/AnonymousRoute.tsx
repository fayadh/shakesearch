import React from 'react';

import { Redirect, Route } from 'react-router-dom';

import { IAuthRouteProps } from './types';

/**
 * Redirects to `/` if an authorized user access the page.
 */
export const AnonymousRoute = ({
  children,
  isAuthenticated,
  ...rest
}: IAuthRouteProps): JSX.Element => (
  <Route
    {...rest}
    //TODO derive pathname from route utils
    render={() => (!isAuthenticated ? children : <Redirect to={{ pathname: '/' }} />)}
  />
);
