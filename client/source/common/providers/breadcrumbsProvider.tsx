import React, { useState } from 'react';

import { BreadcrumbsContext, TBreadcrumbsState } from '@common/contexts/breadcrumbsContext';

export const BreadcrumbsProvider: React.FunctionComponent = (props) => {
  const [breadcrumbs, setBreadcrumbs] = useState<TBreadcrumbsState>({});
  const value = {
    breadcrumbs,
    setBreadcrumbs: (state: TBreadcrumbsState) => {
      setBreadcrumbs(state);
    },
  };

  return <BreadcrumbsContext.Provider value={value} {...props} />;
};
