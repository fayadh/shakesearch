import makeStyles from '@mui/styles/makeStyles';

import { theme } from '@common/theme';

export const useStyles = makeStyles({
  alert: {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.background.paper,
    alignItems: 'center',
    '& .MuiAlert-icon': {
      color: theme.palette.background.paper,
    },
  },
  closeButton: {
    color: theme.palette.background.paper,
  },
});
