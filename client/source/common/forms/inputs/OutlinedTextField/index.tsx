import React from 'react';

import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

export const OutlinedTextField: React.FC<TextFieldProps> = (props) => (
  <MuiTextField variant={'outlined'} {...props}></MuiTextField>
);
