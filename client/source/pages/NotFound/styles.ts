import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  bud: {
    color: theme.palette.primary.main,
  },
  icon: {
    fontSize: theme.spacing(8),
    textAlign: 'center',
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  statusCode: {
    color: 'rgba(0, 0, 0, 0.16)',
    display: 'block',
    textAlign: 'center',
  },
}));
