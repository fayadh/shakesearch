import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { IFormData } from "../..";
import React from "react";
import { ServerRoutes } from "@common/constants/serverRoutes";
import { UseFormRegister } from "react-hook-form";
import { getServerRouteURL } from "@common/helpers";
import useFetch from "@hooks/useFetch";
import { useStyles } from "./styles";

interface IWorksFiltersProps {
  value: IFormData["workId"];
  setWorkId: (wordId: string) => void;
}

/**
 * Works filter.
 */
export const WorksFilter: React.FC<IWorksFiltersProps> = ({
  value,
  setWorkId,
}) => {
  const classes = useStyles();

  const url = getServerRouteURL(ServerRoutes.Works);

  const { data = [], error, loading } = useFetch(url);

  const works = data.map((d) => d._source);

  const labelId = "workId-label";

  return (
    <FormControl className={classes.root}>
      <InputLabel id={labelId}>Work</InputLabel>
      <Select
        autoWidth
        labelId={labelId}
        value={value}
        onChange={(event) => {
          setWorkId(event.target.value);
        }}
      >
        {works.map((work) => (
          <MenuItem key={work.WorkID} value={work.WorkID}>
            {work.Title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
