/* eslint-disable max-lines-per-function */
import makeStyles from '@mui/styles/makeStyles';

const drawerWidth = '275px';

export const useStyles = makeStyles((theme) => ({
  breadCrumbs: {
    paddingBottom: theme.spacing(2),
  },
  content: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    gridArea: 'content',
    padding: theme.spacing(6),
  },
  drawer: {
    flexShrink: 0,
    gridArea: 'drawer',
    width: drawerWidth,
  },
  drawerPaper: {
    borderRight: 'none',
    width: drawerWidth,
  },
  root: {
    background: theme.palette.background.default,
    display: 'grid',
    gridTemplateAreas: `
      "drawer content"
    `,
    gridTemplateColumns: `${drawerWidth} auto`,
    gridTemplateRows: '1fr',
    height: '100%',
    width: '100%',
  },
}));
