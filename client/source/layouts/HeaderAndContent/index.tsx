/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';

export interface IHeaderAndContentLayoutProps {
  header: React.FC;
  content: React.FC;
}

export const HeaderAndContentLayout = ({
  header: Header,
  content: Content,
}: IHeaderAndContentLayoutProps) => (
  <>
    <Header />
    <Content />
  </>
);
