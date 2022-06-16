import React from 'react';

import { Select as MuiSelect, SelectProps } from '@mui/material';

export const Select = <T,>(props: SelectProps<T>) => (
  <MuiSelect disableUnderline variant={'standard'} {...props}></MuiSelect>
);
