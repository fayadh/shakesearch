import { useEffect, useContext } from 'react';

import { isEqual } from 'lodash';

import { BreadcrumbsContext, TBreadcrumbsState } from '@common/contexts/breadcrumbsContext';

export const useBreadcrumbs = (newBreadcrumbsState: TBreadcrumbsState) => {
  const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);

  useEffect(() => {
    if (!isEqual(breadcrumbs, newBreadcrumbsState)) {
      setBreadcrumbs(newBreadcrumbsState);
    }
  }, [breadcrumbs, newBreadcrumbsState, setBreadcrumbs]);
};
