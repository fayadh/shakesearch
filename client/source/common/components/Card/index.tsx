import React, { FunctionComponent, ReactNode } from "react";

import { Divider, Paper } from "@mui/material";
import clsx from "clsx";

import { useStyles } from "./styles";

export interface ICard {
  // TODO: rename to className
  classProps?: string;
  isLoading?: boolean;
  title?: string | ReactNode;
  titleClassName?: string;
}

export const CardInner: FunctionComponent<ICard> = ({
  title,
  isLoading = false,
  children,
  titleClassName,
}) => {
  const classes = useStyles();

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <>
      {title && (
        <>
          <div className={clsx([classes.title, titleClassName])}>{title}</div>
          <Divider />
        </>
      )}
      <div className={classes.content}>{children}</div>
    </>
  );
};

export const Card: FunctionComponent<ICard> = (props) => (
  <Paper className={props.classProps}>
    <CardInner {...props} />
  </Paper>
);
