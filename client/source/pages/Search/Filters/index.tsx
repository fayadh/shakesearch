import { CharactersFilter } from "./Characters";
import { IFormData } from "..";
import React from "react";
import { ScenesAndActsFilter } from "./ScenesAndActs";
import { WorksFilter } from "./Works";
import { useStyles } from "./styles";

export type TSetterFunction = (value: string) => void;

interface IFiltersProps extends IFormData {
  setQ: TSetterFunction;
  setWorkId: TSetterFunction;
  setCharId: TSetterFunction;
  setAct: TSetterFunction;
  setScene: TSetterFunction;
}

/**
 * Search filters.
 */
export const Filters: React.FC<IFiltersProps> = ({
  act,
  charId,
  scene,
  workId,
  setAct,
  setCharId,
  setScene,
  setWorkId,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <WorksFilter value={workId} setWorkId={setWorkId} />

      {workId && (
        <>
          <CharactersFilter
            workId={workId}
            charId={charId}
            setCharId={setCharId}
          />
          <ScenesAndActsFilter
            workId={workId}
            act={act}
            scene={scene}
            setAct={setAct}
            setScene={setScene}
          />
        </>
      )}
    </div>
  );
};
