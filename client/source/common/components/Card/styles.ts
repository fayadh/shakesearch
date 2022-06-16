import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    fontSize: '15px',
    fontWeight: 400,
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));
