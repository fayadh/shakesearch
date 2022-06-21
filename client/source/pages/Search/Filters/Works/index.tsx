import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { IFormData } from "../..";
import React from "react";
import { ServerRoutes } from "@common/constants/serverRoutes";
import { UseFormRegister } from "react-hook-form";
import { getServerRouteURL } from "@common/helpers";
import useFetch from "@hooks/useFetch";
import { useStyles } from "./styles";

interface IWorksFiltersProps {
  register: UseFormRegister<IFormData>;
  values: IFormData;
}

/**
 * Works filter.
 */
export const WorksFilter: React.FC<IWorksFiltersProps> = ({ register }) => {
  const classes = useStyles();

  const url = getServerRouteURL(ServerRoutes.Works);
  const { data = [], error, loading } = useFetch(url);

  const works = data.map((d) => d._source);

  const workIdRegistrationProps = register("workId");

  const labelId = "workId-label";

  return (
    <FormControl className={classes.root}>
      <InputLabel id={labelId}>Work</InputLabel>
      <Select autoWidth labelId={labelId} {...workIdRegistrationProps}>
        {works.map((work) => (
          <MenuItem key={work.WorkID} value={work.WorkID}>
            {work.Title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
