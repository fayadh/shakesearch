import React from 'react';

import { doNothing } from '@common/helpers';
import { ITestableFC } from '@common/types';

interface IButtonDivProps extends ITestableFC {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

export const ButtonDiv: React.FC<IButtonDivProps> = ({ children, className, dataCy, onClick }) => (
  <div
    className={className}
    data-cy={dataCy}
    onClick={onClick}
    onKeyDown={doNothing}
    role={'button'}
    tabIndex={0}
  >
    {children}
  </div>
);
