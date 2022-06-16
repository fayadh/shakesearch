import React from 'react';

import { Typography } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Route, Link as RouterLink } from 'react-router-dom';

import { BreadcrumbsContext, TBreadcrumbsState } from '@common/contexts/breadcrumbsContext';

type MatchedPath = string;
type DefaultBreadcrumbName = string;
const breadcrumbNameMap: Record<MatchedPath, DefaultBreadcrumbName> = {
  '/': 'Search',
};

interface ILinkRouterProps {
  color: string;
  to: string;
  key?: string;
  children: string;
}

const LinkRouter = (props: ILinkRouterProps) => <Link {...props} component={RouterLink} />;

const isIdentifier = (strings: string) => strings[0] === ':';

const getName = (
  matchedPath: string,
  locationPathIndex: number,
  breadcrumbs: TBreadcrumbsState,
): string => {
  const matchedPathnames = matchedPath.split('/').filter((x) => x);
  const matchedRoute = `/${matchedPathnames.slice(0, locationPathIndex + 1).join('/')}`;
  const { [locationPathIndex]: matchedPathPart } = matchedPathnames;

  if (matchedPathPart) {
    return isIdentifier(matchedPathPart)
      ? breadcrumbs[matchedPathPart.replace(':', '')]
      : breadcrumbNameMap[matchedRoute];
  }

  return '';
};

interface IBreadCrumbsProps {
  className: string;
}

export const BreadCrumbs = ({ className }: IBreadCrumbsProps) => (
  <BreadcrumbsContext.Consumer>
    {({ breadcrumbs }) => (
      <Route>
        {({ location, match }) => {
          const pathnames = location.pathname.split('/').filter((x) => x);

          return (
            <MuiBreadcrumbs className={className} aria-label="breadcrumbs" separator=">">
              {pathnames.map((_, index) => {
                const isLast = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const { [index]: currentPathName } = pathnames;

                const name = match?.path
                  ? getName(match.path, index, breadcrumbs)
                  : currentPathName;

                return isLast ? (
                  <Typography color="textPrimary" key={to}>
                    {name}
                  </Typography>
                ) : (
                  <LinkRouter color="textSecondary" to={to} key={to}>
                    {name}
                  </LinkRouter>
                );
              })}
            </MuiBreadcrumbs>
          );
        }}
      </Route>
    )}
  </BreadcrumbsContext.Consumer>
);
