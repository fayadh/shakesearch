import React from "react";

import { UseFormRegister } from "react-hook-form";
import { IFormData } from "..";
import { useStyles } from "./styles";
import { WorksFilter } from "./Works";

interface IFiltersProps {
  register: UseFormRegister<IFormData>;
  values: IFormData;
}

/**
 * Search filters.
 */
export const Filters: React.FC<IFiltersProps> = ({ register, values }) => {
  const classes = useStyles();

  console.log("filter values", values);

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
