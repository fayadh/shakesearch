import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { IFormData } from "../..";
import React from "react";
import { ServerRoutes } from "@common/constants/serverRoutes";
import { TSetterFunction } from "..";
import _ from "lodash";
import { getServerRouteURL } from "@common/helpers";
import useFetch from "@hooks/useFetch";
import { useStyles } from "./styles";

interface IScenesAndActsFilterProps
  extends Pick<IFormData, "workId" | "act" | "scene"> {
  setAct: TSetterFunction;
  setScene: TSetterFunction;
}

/**
 * Scenes and acts filters.
 */
export const ScenesAndActsFilter: React.FC<IScenesAndActsFilterProps> = ({
  workId,
  act,
  scene,
  setAct,
  setScene,
}) => {
  const classes = useStyles();

  const url = getServerRouteURL(ServerRoutes.Work);
  const {
    data = { _source: {} },
    error,
    loading,
  } = useFetch(`${url}?workId=${workId}`);

  const { SectionCount = 0, ChapterCount = 0 } = data._source;

  const actlabelId = "actId-label";
  const scenelabelId = "sceneId-label";

  const chaptersRange = ChapterCount ? _.range(1, ChapterCount + 1) : [];
  const sectionsRange = SectionCount ? _.range(1, SectionCount + 1) : [];

  return (
    <>
      <FormControl className={classes.root}>
        <InputLabel id={actlabelId}>Act</InputLabel>
        <Select
          autoWidth
          labelId={actlabelId}
          value={act}
          onChange={(event) => {
            setAct(event.target.value);
          }}
        >
          <MenuItem value="">*</MenuItem>
          {sectionsRange.map((sectionNumber) => (
            <MenuItem
              key={sectionNumber}
              value={sectionNumber}
              selected={act === sectionNumber}
            >
              {sectionNumber}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.root}>
        <InputLabel id={scenelabelId}>Scene</InputLabel>
        <Select
          autoWidth
          labelId={scenelabelId}
          value={scene}
          onChange={(event) => {
            setScene(event.target.value);
          }}
        >
          <MenuItem value="">*</MenuItem>
          {chaptersRange.map((chapterNumber) => (
            <MenuItem
              key={chapterNumber}
              value={chapterNumber}
              selected={act === chapterNumber}
            >
              {chapterNumber}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
