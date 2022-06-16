import React from 'react';

import { Close } from '@mui/icons-material';
import { Alert, AlertColor, IconButton, Snackbar as MuiSnackBar } from '@mui/material';

import { useStyles } from './styles';

export interface SnackBar {
  severity: AlertColor;
  onClose: () => void;
  open: boolean;
}

/**
 * An alert that pops up for 5 seconds with a display message.
 * Does not maintain its own state and needs state props from parent component.
 * @param props - Props.
 * @param props.severity - Alert severity.
 * @param props.onClose - Function to run after the alert ends (5s).
 * @param props.open - Boolean for if the alert is open.
 * @returns
 */
export const SnackBar: React.FC<SnackBar> = (props) => {
  const classes = useStyles();

  return (
    <MuiSnackBar
      autoHideDuration={5000}
      open={props.open}
      onClose={props.onClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <Alert severity={props.severity} className={classes.alert}>
        {props.children}
        <IconButton onClick={props.onClose} className={classes.closeButton}>
          <Close />
        </IconButton>
      </Alert>
    </MuiSnackBar>
  );
};
