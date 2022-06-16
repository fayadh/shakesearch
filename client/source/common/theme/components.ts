import { Components } from '@mui/material/styles';

export const components: Components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        // Returning the font-size to its original size.
        // https://mui.com/guides/migration-v4/
        // The body font size has changed from theme.typography.body2 (0.875rem) to theme.typography.body1 (1rem). To return to the previous size, you can override it in the theme.
        fontSize: '0.875rem',
        letterSpacing: '0.01071em',
        lineHeight: 1.43,
      },
    },
  },
};
