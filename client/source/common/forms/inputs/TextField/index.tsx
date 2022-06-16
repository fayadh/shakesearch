import React from 'react';

import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

export const TextField: React.FC<TextFieldProps> = (props) => (
  <MuiTextField variant={'standard'} {...props}></MuiTextField>
);
