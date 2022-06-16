import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles({
  modalBox: {
    width: '488px',
    height: '188px',
    background: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '24px',
  },
  modalButtonContainer: {
    display: 'flex',
    justifyContent: 'right',
    marginTop: '16px',
  },
  modalCancelButton: {
    textTransform: 'capitalize',
    marginRight: '12px',
    background: 'white',
    color: '#263238',
    height: '44px',
    width: '108px',
    fontWeight: 600,
    border: '1px solid #263238',
  },
  modalReassignButton: {
    textTransform: 'capitalize',
    background: '#263238',
    color: 'white',
    height: '44px',
    width: '128px',
    fontWeight: 600,
    '&:hover': {
      background: '#263238',
    },
  },
});
