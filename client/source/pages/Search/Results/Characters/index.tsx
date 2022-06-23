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
      <strong>Characters found:</strong>
      {data?.map(({ _source: { CharID, CharName, WorkTitles } }) => {
        return (
          <div className={classes.result} key={CharID}>
            {CharName} in {WorkTitles.replaceAll(",", ", ")}
          </div>
        );
      })}
    </div>
  );
};
