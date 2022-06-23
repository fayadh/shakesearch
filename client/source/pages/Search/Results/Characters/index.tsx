import React from "react";
import { useStyles } from "./styles";

export interface ICharacterResults {
  data?: any[];
}

export const CharacterResults: React.FC<ICharacterResults> = ({
  data = [],
}) => {
  const classes = useStyles();

  if (!data.length) {
    return <div></div>;
  }

  return (
    <div className={classes.root}>
      <div>Characters found:</div>
      {data?.map(({ _source: { CharName, WorkTitles } }) => {
        return (
          <div className={classes.result}>
            {CharName}, {WorkTitles}
          </div>
        );
      })}
    </div>
  );
};
