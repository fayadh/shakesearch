import { CharactersFilter } from "./Characters";
import { IFormData } from "..";
import React from "react";
import { ScenesAndActsFilter } from "./ScenesAndActs";
import { UseFormRegister } from "react-hook-form";
import { WorksFilter } from "./Works";
import { useStyles } from "./styles";

interface IFiltersProps {
  register: UseFormRegister<IFormData>;
  values: IFormData;
  setValue: any;
}

/**
 * Search filters.
 */
export const Filters: React.FC<IFiltersProps> = ({
  register,
  setValue,
  values,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <WorksFilter register={register} />
      {values.workId && (
        <>
          <CharactersFilter register={register} workId={values.workId} />
          <ScenesAndActsFilter
            register={register}
            workId={values.workId}
            setValue={setValue}
          />
        </>
      )}
    </div>
  );
};
