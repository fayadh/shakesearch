import React from 'react';

import { Button, ButtonProps } from '@mui/material';

export const SecondaryButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button color="secondary" type="button" variant="contained" {...props}>
    {children}
  </Button>
);
