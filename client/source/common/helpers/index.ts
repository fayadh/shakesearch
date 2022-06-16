import React from 'react';

export const doNothing = () => null;

export const passPropsToChildren = (children: React.ReactNode, props: Record<string, unknown>) =>
  // FIX: cant be any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.Children.map(children, (child) => React.cloneElement(child as any, props));
