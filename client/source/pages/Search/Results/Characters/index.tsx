import React from "react";
import { Card } from "@common/components/Card";

import { useStyles } from "./styles";

export interface ICharacterResults {
  data?: any[];
}

export const CharacterResults: React.FC<ICharacterResults> = ({ data }) => {
  const classes = useStyles();

  if (!data) {
    return <div>No Data</div>;
  }

  return (
    <div className={classes.root}>
      {data?.map(({ _source }) => {
        return (
          <div className={classes.result}>
            <Card title={"Characters"}>
              <span className={classes.characters}>{_source.CharName}</span>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
