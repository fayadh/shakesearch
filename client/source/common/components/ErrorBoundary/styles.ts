import { Theme } from '@mui/material/styles/createTheme';
import { makeStyles } from '@mui/styles';

import { IErrorPageProps } from './ErrorPage';

export const useStyles = makeStyles<Theme, IErrorPageProps>((theme) => ({
  logo: {
    width: '20%',
  },
  message: {
    margin: theme.spacing(5),
  },
  root: {
    alignItems: 'center',
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    fontStyle: `${theme.typography.fontFamily} !important`,
    height: ({ isHeightRelative }) => (isHeightRelative ? '100%' : '100vh'),
    justifyContent: 'center',
    width: '100%',
  },
}));
