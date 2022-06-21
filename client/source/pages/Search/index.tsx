import React, { useState } from "react";
import { getCurrentQueryStrings, setUrlQuery } from "@common/helpers";

import { Filters } from "./Filters";
import Joi from "joi";
import { Logo } from "./Logo";
import { ParagraphResults } from "./Results/Paragraphs";
import { SearchInput } from "@common/forms/inputs/Search";
import _ from "lodash";
import { joiResolver } from "@hookform/resolvers/joi";
import useFetch from "@hooks/useFetch";
import { useForm } from "react-hook-form";
import { useStyles } from "./styles";

export interface IFormData {
  q: string;
  workId?: string;
  charId?: string;
  act?: number;
  scene?: number;
  page?: number;
}

const formSchema = () =>
  Joi.object({
    q: Joi.string(),
    workId: Joi.string().optional(),
    charId: Joi.string().optional(),
    act: Joi.string().optional(),
    scene: Joi.string().optional(),
  }).options({ presence: "required" });

const cleanValues = (values) => {
  const newValues = _.omitBy(values, (value) => {
    return _.isNil(value) || !value;
  });

  return newValues;
};

/**
 * Search
 */
export const Search: React.FC = () => {
  const classes = useStyles();

  // inherit query from the url
  const {
    q,
    workId,
    charId,
    act,
    scene,
    page: pageFromQuery,
  } = getCurrentQueryStrings();
  const parsedQueryStrings = {
    q,
    workId,
    charId,
    act,
    scene,
    page: pageFromQuery,
  };

  const [page, setPage] = useState<number>(pageFromQuery as number);

  const { watch, register, getValues, setValue } = useForm<IFormData>({
    defaultValues: { q, workId, charId, act, scene, page },
    mode: "onChange",
    resolver: joiResolver(formSchema()),
  });

  const queryRegistrationProps = register("q");

  // watch all fields
  const watchAllFields = watch();
  const formValues = getValues();

  const s = new URLSearchParams(cleanValues(parsedQueryStrings)).toString();

  const url = q ? `http://localhost:3001/search?${s}` : "";

  const { data, error, loading } = useFetch(url);

  React.useEffect(() => {
    const newValues = cleanValues({
      ...getValues(),
      page,
    });
    console.log("setting URL values as", newValues, getValues(), page);

    const newUrl = new URLSearchParams(newValues).toString();

    setUrlQuery(newUrl);
  }, [watchAllFields, page]);

  return (
    <div className={classes.root}>
      <Logo />

      <SearchInput
        inputClassName={classes.input}
        onClearValue={() => null}
        inputProps={queryRegistrationProps}
        placeholder="Search"
        value={formValues.q}
      />

      <Filters register={register} values={formValues} setValue={setValue} />

      {/* <WorkResults data={data?.works?.hits ?? []} /> */}
      {/* <CharacterResults data={data?.characters?.hits ?? []} /> */}
      <ParagraphResults
        data={data?.paragraphs?.hits ?? []}
        total={data?.paragraphs?.total ?? 0}
        isLoading={loading}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};
