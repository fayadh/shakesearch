import makeStyles from '@mui/styles/makeStyles';

import CloseIcon from '@common/icons/close.svg';
import SearchIcon from '@common/icons/search.svg';

export const shapeSVGBackgroundCSS = (svg: string) => `url(${svg}) center / contain no-repeat`;

const shapeBefore = (svg: string) => ({
  background: shapeSVGBackgroundCSS(svg),
  bottom: '0',
  content: '""',
  height: '11px',
  position: 'absolute',
  top: '14px',
  width: '11px',
});

export const useStyles = makeStyles((theme) => ({
  clearInput: {
    '&:before': {
      ...shapeBefore(CloseIcon),
      cursor: 'pointer',
      right: '10px',
    },
  },
  input: {
    background: theme.palette.background.paper,
    border: 'none',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.secondary,
    padding: '10px',
    paddingLeft: '28px',
    paddingRight: '28px',
    width: '100%',
  },
  root: {
    '&:before': {
      ...shapeBefore(SearchIcon),
      left: '10px',
    },
    display: 'flex',
    minWidth: '220px',
    position: 'relative',
  },
}));
