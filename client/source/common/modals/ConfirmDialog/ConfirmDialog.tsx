import React from 'react';

import { Box, Button, DialogProps } from '@mui/material';

import { Dialog } from '@common/components/Dialog';

import { useStyles } from './styles';

export type ConfirmDialogBodyProps<T> = {
  oldValue?: T;
  newValue?: T;
};

export interface IConfirmDialogProps<T = unknown> extends DialogProps {
  confirm: (newValue?: T) => void;
  cancel: () => void;
  oldValue?: T;
  newValue?: T;
  title: string;
}

export const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
  confirm,
  cancel,
  open,
  newValue,
  title,
  children,
}: IConfirmDialogProps) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.modalBox}
      {...{
        onClose: cancel,
        open,
        title,
      }}
    >
      <Box>
        {children}
        <div className={classes.modalButtonContainer}>
          <Button className={classes.modalCancelButton} onClick={cancel}>
            Cancel
          </Button>
          <Button className={classes.modalReassignButton} onClick={() => confirm(newValue)}>
            Re-assign
          </Button>
        </div>
      </Box>
    </Dialog>
  );
};
