import React from "react";

import useFetch from "@hooks/useFetch";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { IFormData } from "../..";
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

  const url = `http://localhost:3001/works`;
  const { data = [], error, loading } = useFetch(url);

  const works = data.map((d) => d._source);

  console.log("works data", data);

  const workIdRegistrationProps = register("workId");

  const labelId = "workId-label";

  return (
    <FormControl>
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
