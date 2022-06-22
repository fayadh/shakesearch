import React, { useState } from "react";
import { getCurrentQueryStrings, setUrlQuery } from "@common/helpers";

import { Filters } from "./Filters";
import { Logo } from "./Logo";
import { ParagraphResults } from "./Results/Paragraphs";
import { SearchInput } from "@common/forms/inputs/Search";
import _ from "lodash";
import useFetch from "@hooks/useFetch";
import { usePrevious } from "@hooks/usePrevious";
import { useStyles } from "./styles";

export interface IFormData {
  q: string;
  workId?: string;
  charId?: string;
  act?: number;
  scene?: number;
  page?: number;
}

/**
 * Remove empty values from an object.
 *
 * @param obj The object you want to remove empty values from.
 * @returns obj
 */
const removeEmptyValues = (obj) => {
  const newValues = _.omitBy(obj, (value) => {
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
  const currentQueryStrings = getCurrentQueryStrings();

  // q is query
  const [q, setQ] = useState<string>(currentQueryStrings.q);
  const [workId, setWorkId] = useState<string>(currentQueryStrings.workId);
  const [charId, setCharId] = useState<string>(currentQueryStrings.charId);
  const [act, setAct] = useState<number>(Number(currentQueryStrings.act));
  const [scene, setScene] = useState<number>(Number(currentQueryStrings.scene));
  const [page, setPage] = useState<number>(Number(currentQueryStrings.page));

  const previousWorkId = usePrevious(workId);
  const query = new URLSearchParams(
    removeEmptyValues({
      q,
      workId,
      charId,
      act,
      scene,
      page,
    })
  ).toString();

  const url =
    previousWorkId === workId && q
      ? `http://localhost:3001/search?${query}`
      : "";

  const { data, error, loading } = useFetch(url);

  const resetAllFiltersExceptWorkId = () => {
    setCharId("");
    setAct(0);
    setScene(0);
    setPage(1);
  };

  React.useEffect(() => {
    if (previousWorkId !== workId) {
      resetAllFiltersExceptWorkId();

      return;
    }

    const query = removeEmptyValues({
      q,
      workId,
      charId,
      act,
      scene,
      page,
    });

    const url = new URLSearchParams(query).toString();

    setUrlQuery(url);
  }, [q, charId, act, scene, workId, page]);

  return (
    <div className={classes.root}>
      <Logo />

      <SearchInput
        inputClassName={classes.input}
        onClearValue={() => null}
        placeholder="Search"
        onChange={(value) => setQ(value)}
        value={q}
      />

      <Filters
        q={q}
        workId={workId}
        charId={charId}
        act={act}
        scene={scene}
        setQ={setQ}
        setWorkId={setWorkId}
        setCharId={setCharId}
        setAct={setAct}
        setScene={setScene}
      />

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
