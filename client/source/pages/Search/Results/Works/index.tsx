import React from "react";
import { useStyles } from "./styles";

export interface IWorkResults {
  data?: any[];
}

export const WorkResults: React.FC<IWorkResults> = ({ data = [] }) => {
  const classes = useStyles();

  if (!data.length) {
    return <div></div>;
  }

  return (
    <div className={classes.root}>
      <div>Works found:</div>
      {data?.map(({ _source: { Title, Date } }) => {
        return (
          <div className={classes.result}>
            {Title}, {Date}
          </div>
        );
      })}
    </div>
  );
};
