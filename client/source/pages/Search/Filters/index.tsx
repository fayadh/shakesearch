import useFetch from "@hooks/useFetch";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IFormData } from "..";
import { useStyles } from "./styles";

interface IFiltersProps {
  register: UseFormRegister<IFormData>;
}

/**
 * Works filter.
 */
export const WorksFilter: React.FC<IFiltersProps> = ({ register }) => {
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
      <Select
        {...workIdRegistrationProps}
        autoWidth
        labelId={labelId}
        id="workId-selector"
      >
        {works.map((work) => {
          return (
            <MenuItem key={work.workId} value={work.workId}>
              {work.Title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

/**
 * Filters
 */
export const Filters: React.FC<IFiltersProps> = ({ register }) => {
  const classes = useStyles();

  // const charIdRegistrationProps = register("charId");
  // const actRegistrationProps = register("act");
  // const sceneRegistrationProps = register("scene");

  return (
    <div className={classes.root}>
      <WorksFilter register={register} />
      {/* <Select {...charIdRegistrationProps} />
      <Select {...actRegistrationProps} />
      <Select {...sceneRegistrationProps} /> */}
    </div>
  );
};
