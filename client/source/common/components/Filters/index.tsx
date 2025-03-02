import React from "react";
import { Card } from "../Card";

import { useStyles } from "./styles";

export interface IFilters {
  data?: any[];
}

export const Filters: React.FC<IFilters> = ({ data }) => {
  const classes = useStyles();

  const cleanString = (str: string) => {
    return str.replace(/\[p\]/g, "");
  };

  return (
    <div className={classes.root}>
      {data?.map(({ _source }) => {
        return (
          <div className={classes.result}>
            <Card
              title={
                <div className={classes.context}>
                  <span className={classes.character}>
                    {cleanString(_source.CharName)}
                  </span>
                  <span className={classes.in}>in</span>
                  <span className={classes.work}>
                    {cleanString(_source.WorkTitle)}
                  </span>
                </div>
              }
            >
              <span className={classes.paragraph}>
                {cleanString(_source.PlainText)}
              </span>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
