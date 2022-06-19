import React from "react";

import { useStyles } from "./styles";

/**
 * App logo
 */
export const Logo: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.root}>Shakesearch ⚡️</div>;
};
