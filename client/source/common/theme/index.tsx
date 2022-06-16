import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { components } from './components';
import { palette } from './palette';

export const theme = createTheme({
  components,
  palette,
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

export const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
