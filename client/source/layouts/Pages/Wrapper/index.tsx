import React from "react";

import { useStyles } from "./styles";

export const PagesWrapper: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};
