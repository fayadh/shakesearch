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
 * Filters
 */
export const WorksFilter: React.FC<IFiltersProps> = ({ register }) => {
  const classes = useStyles();

  const url = `http://localhost:3001/works`;
  const { data, error, loading } = useFetch(url);

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
        {[
          {
            workId: "fooBar",
            Title: "This is a title",
          },
        ].map((option) => {
          return (
            <MenuItem key={option.workId} value={option.workId}>
              {option.Title}
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

  const url = `http://localhost:3001/works`;
  const { data, error, loading } = useFetch(url);

  console.log("works data", data);

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
