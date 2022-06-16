import { createContext } from 'react';

export type TBreadcrumbsState = Record<string, string>;
export interface IBreadcrumbsContext {
  breadcrumbs: TBreadcrumbsState;
  setBreadcrumbs: (breadcrumbs: TBreadcrumbsState) => void;
}

const defaultValues = {
  breadcrumbs: {},
  setBreadcrumbs: () => {
    // do nothing
  },
};

export const BreadcrumbsContext = createContext<IBreadcrumbsContext>(defaultValues);
