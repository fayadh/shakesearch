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
      <strong>Works found:</strong>
      {data?.map(({ _source: { WorkID, Title, Date } }) => {
        return (
          <div className={classes.result} key={WorkID}>
            {Title}: {Date}
          </div>
        );
      })}
    </div>
  );
};
