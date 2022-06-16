/* eslint-disable max-lines-per-function */
import { Theme } from '@mui/material/styles/createTheme';
import { makeStyles } from '@mui/styles';

import { IPillWithIconProps } from './types';

export const useStyles = makeStyles<Theme, IPillWithIconProps>((theme) => ({
  icon: {
    alignItems: 'center',
    display: 'flex',
    gridArea: 'icon',
    justifyContent: 'center',
    transition: 'transform 400ms',
    verticalAlign: 'middle',
  },
  inner: {
    display: 'grid',
    gridTemplateAreas: '"text icon"',
    gridTemplateColumns: '5fr 36px',
    gridTemplateRows: '1fr',
    height: '100%',
    paddingLeft: '12px',
  },
  root: {
    background: ({ selectionText: isPopulated }) =>
      isPopulated ? theme.palette.text.secondary : 'white', //TODO: add to theme
    borderRadius: '4px',
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 10%)',
    color: ({ selectionText: isPopulated }) => (isPopulated ? 'white' : 'rgba(0,0,0,0.54)'), //TODO: add to theme
    display: 'inline-block',
    fontSize: '13px',
    fontWeight: 500,
    height: '38px',
    lineHeight: 'normal',
    maxWidth: '300px',
    minWidth: '100px',
  },
  selectionText: {
    textOverflow: 'ellipsis',
  },
  text: {
    alignItems: 'center',
    display: 'flex',
    gridArea: 'text',
    verticalAlign: 'middle',
  },
  title: {
    '& span': {
      fontWeight: ({ selectionText: isPopulated }) => (isPopulated ? 600 : 'inherit'),
    },
  },
}));
