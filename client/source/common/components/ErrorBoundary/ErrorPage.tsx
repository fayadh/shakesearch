import React from 'react';

import { Typography } from '@mui/material';

import { messages } from '@common/constants/messages';

import { useStyles } from './styles';

export interface IErrorPageProps {
  isHeightRelative?: boolean;
}

export const ErrorPage: React.FC<IErrorPageProps> = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Typography variant={'h5'} className={classes.message}>
        {messages.errorBoundary}
      </Typography>
    </div>
  );
};
