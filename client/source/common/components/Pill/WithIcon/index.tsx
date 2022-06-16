import React from 'react';

import clsx from 'clsx';

import { Pill } from '..';
import { useStyles } from './styles';
import { IPillWithIconProps } from './types';

export const PillWithIcon: React.FC<IPillWithIconProps> = (props) => {
  const {
    children,
    className,
    iconClassName,
    iconComponent: Icon,
    iconContainerClassName,
    onClick,
  } = props;
  const classes = useStyles(props);

  return (
    <Pill className={className} onClick={onClick}>
      <div className={classes.inner}>
        {children}
        {Icon && (
          <span className={clsx([classes.icon, iconContainerClassName])}>
            <Icon className={iconClassName} />
          </span>
        )}
      </div>
    </Pill>
  );
};
