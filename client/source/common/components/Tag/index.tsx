import React from 'react';

import clsx from 'clsx';

import { useStyles } from './styles';

export interface ITagProps {
  className?: string;
  color?: string;
  text: string;
}

export const Tag: React.FC<ITagProps> = (props) => {
  const classes = useStyles(props);

  return <span className={clsx([classes.root, props.className])}>{props.text}</span>;
};
