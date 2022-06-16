import React from 'react';

import { Paper } from '@mui/material';

interface IForm {
  className?: string;
  onSubmit?(): void;
  hasPaperBackground?: boolean;
}

export const Form: React.FC<IForm> = ({
  className,
  children,
  onSubmit,
  hasPaperBackground = true,
}) => (
  <form onSubmit={onSubmit}>
    {hasPaperBackground ? <Paper className={className}>{children}</Paper> : children}
  </form>
);
