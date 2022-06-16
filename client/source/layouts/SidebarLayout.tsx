import React from 'react';

import { Navigation } from '@navigation/.';

interface IProps {
  children: React.ReactNode;
}

export const SidebarLayout = ({ children }: IProps): JSX.Element => (
  <>
    <Navigation>{children}</Navigation>
  </>
);
