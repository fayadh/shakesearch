import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles<Theme, { hasFileName: boolean }>({
  clearButton: ({ hasFileName }) => ({
    borderBottomLeftRadius: 0,
    borderLeft: 'none',
    borderTopLeftRadius: 0,
    display: hasFileName ? 'flex' : 'none',
    justifyContent: 'center',
  }),
  closeIcon: {
    margin: 'auto',
  },
  fileButton: ({ hasFileName }) => ({
    borderBottomRightRadius: hasFileName ? 0 : 'inherit',
    borderTopRightRadius: hasFileName ? 0 : 'inherit',
  }),
  imageInput: {
    display: 'none',
  },
  textInput: {
    display: 'none',
  },
  wrapper: {
    display: 'flex',
  },
});
