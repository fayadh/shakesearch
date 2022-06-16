import { alpha } from '@mui/material/styles';
import { Theme } from '@mui/material/styles/createTheme';
import { makeStyles } from '@mui/styles';

import { ITagProps } from './';

export const useStyles = makeStyles<Theme, ITagProps>({
  root: {
    alignItems: 'center',
    backgroundColor: ({ color }) => alpha(color ?? '#000000', 0.08),
    color: ({ color }) => color ?? 'black',
    display: 'flex',
    height: '19px',
    padding: '0.15rem 0.8rem',
    width: 'fit-content',
  },
});
