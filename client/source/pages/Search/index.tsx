import { SearchInput } from "@common/forms/inputs/Search";
import { joiResolver } from "@hookform/resolvers/joi";
import useFetch from "@hooks/useFetch";
import React, { useState } from "react";
import { getCurrentQueryStrings, setUrlQueryPart } from "@common/helpers";
import { ParagraphResults } from "@common/components/Paragraphs";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { useStyles } from "./styles";
import { Filters } from "./Filters";

export interface IFormData {
  q: string;
  workId?: string;
  charId?: string;
  act?: string;
  scene?: string;
}

const formSchema = () =>
  Joi.object({
    q: Joi.string(),
    workId: Joi.string().optional(),
    charId: Joi.string().optional(),
    act: Joi.string().optional(),
    scene: Joi.string().optional(),
  }).options({ presence: "required" });

/**
 * Search
 */
export const Search: React.FC = () => {
  const classes = useStyles();

  // inherit query from the url
  const { q = "", workId, charId, act, scene } = getCurrentQueryStrings();

  console.log("here");

  const [results, setResults] = useState<{}>([]);

  const { watch, formState, handleSubmit, register, setValue, getValues } =
    useForm<IFormData>({
      defaultValues: { q, workId, charId, act, scene },
      mode: "onChange",
      resolver: joiResolver(formSchema()),
    });

  const queryRegistrationProps = register("q");

  // watch all fields
  const watchAllFields = watch();
  const formValues = getValues();

  const url = `http://localhost:3001/search?q=${q}`;

  console.log("getting data");
  const { data, error, loading } = useFetch(url);

  console.log("data received", data);

  React.useEffect(() => {
    // const subscription = watch((value, { name, type }) => console.log(value, name, type));
    // return () => subscription.unsubscribe();
    console.log("data has changed", getValues());

    // setResults(data);
  }, [watchAllFields]);

  console.log("form values", formValues);

  return (
    <div className={classes.root}>
      <SearchInput
        {...queryRegistrationProps}
        inputClassName={classes.input}
        onClearValue={() => null}
        inputProps={queryRegistrationProps}
        placeholder="Search"
        value={formValues.q}
      />
      <Filters register={register} values={formValues} />
      <ParagraphResults data={results?.paragraphs?.hits ?? []} />
    </div>
  );
};
