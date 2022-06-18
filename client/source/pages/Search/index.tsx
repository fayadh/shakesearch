import { SearchInput } from "@common/forms/inputs/Search";
import { joiResolver } from "@hookform/resolvers/joi";
import useFetch from "@hooks/useFetch";
import React, { useState } from "react";
import { getCurrentQueryStrings, setUrlQuery } from "@common/helpers";
import { isString } from "lodash";
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
  const { q = "" } = getCurrentQueryStrings();

  const [query, setQuery] = useState<string>(isString(q) ? q : "");

  const url = `http://localhost:3001/search?q=${query}`;
  const { data, error, loading } = useFetch(url);

  const { formState, handleSubmit, register, setValue } = useForm<IFormData>({
    defaultValues: { q },
    mode: "onChange",
    resolver: joiResolver(formSchema()),
  });

  return (
    <div className={classes.root}>
      <SearchInput
        inputClassName={classes.input}
        onClearValue={() => null}
        onChange={(value) => {
          setUrlQuery(`q=${value}`);
          setQuery(value);
        }}
        placeholder="Search"
        value={query}
      />
      <Filters register={register} />

      <ParagraphResults data={data?.paragraphs?.hits ?? []} />
    </div>
  );
};
