import React from 'react';

import { Button, ButtonProps } from '@mui/material';

export const PrimaryButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button color="primary" type="button" variant="contained" {...props}>
    {children}
  </Button>
);
