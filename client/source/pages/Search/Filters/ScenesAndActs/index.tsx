import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";

import { IFormData } from "../..";
import { ServerRoutes } from "@common/constants/serverRoutes";
import { UseFormRegister } from "react-hook-form";
import _ from "lodash";
import { getServerRouteURL } from "@common/helpers";
import useFetch from "@hooks/useFetch";
import { useStyles } from "./styles";

interface IScenesAndActsFilterProps {
  register: UseFormRegister<IFormData>;
  workId: string;
  setValue: any;
}

/**
 * Scenes and acts filters.
 */
export const ScenesAndActsFilter: React.FC<IScenesAndActsFilterProps> = ({
  register,
  workId,
  setValue,
}) => {
  const classes = useStyles();

  const url = getServerRouteURL(ServerRoutes.Work);
  const {
    data = { _source: {} },
    error,
    loading,
  } = useFetch(`${url}?workId=${workId}`);
  const { SectionCount = 0, ChapterCount = 0 } = data._source;

  const actRegistrationProps = register("act");
  const sceneRegistrationProps = register("scene");

  useEffect(() => {
    setValue("act", "");
    setValue("scene", "");
  }, [workId]);

  const labelId = "charId-label";

  return (
    <>
      <FormControl className={classes.root}>
        <InputLabel id={labelId}>Act</InputLabel>
        <Select autoWidth labelId={labelId} {...actRegistrationProps}>
          <MenuItem value="">*</MenuItem>
          {_.range(1, ChapterCount + 1).map((chapterNumber) => (
            <MenuItem key={chapterNumber} value={chapterNumber}>
              {chapterNumber}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.root}>
        <InputLabel id={labelId}>Scene</InputLabel>
        <Select autoWidth labelId={labelId} {...sceneRegistrationProps}>
          <MenuItem value="">*</MenuItem>
          {_.range(1, SectionCount + 1).map((sectionNumber) => (
            <MenuItem key={sectionNumber} value={sectionNumber}>
              {sectionNumber}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
