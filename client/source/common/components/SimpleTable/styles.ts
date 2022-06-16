import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  data: {
    display: 'flex',
    justifyContent: 'right',
  },
  header: {
    fontWeight: 'normal',
    height: theme.spacing(3.5),
    textAlign: 'left',
  },
  publisherStatusTag: {
    marginLeft: 'auto',
  },
  table: {
    margin: theme.spacing(0.75),
    width: '98%',
  },
}));
