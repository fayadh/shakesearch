import React from 'react';

import clsx from 'clsx';

import { ButtonDiv } from '@common/buttons/ButtonDiv';
import { ITestableFC } from '@common/types';

import { useStyles } from './styles';

export interface IPillProps extends ITestableFC {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Pill: React.FC<IPillProps> = (props) => {
  const { children, className, dataCy, onClick } = props;
  const classes = useStyles(props);

  return (
    <ButtonDiv className={clsx([classes.root, className])} dataCy={dataCy} onClick={onClick}>
      {children}
    </ButtonDiv>
  );
};
