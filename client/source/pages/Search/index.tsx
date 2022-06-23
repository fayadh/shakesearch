import React, { useEffect, useState } from "react";
import {
  getCurrentQueryStrings,
  getServerRouteURL,
  removeEmptyValues,
  setUrlQuery,
} from "@common/helpers";

import { CharacterResults } from "./Results/Characters";
import { Logo } from "./Logo";
import { ParagraphFilters } from "./Filters";
import { ParagraphResults } from "./Results/Paragraphs";
import { SearchInput } from "@common/forms/inputs/Search";
import { ServerRoutes } from "@common/constants/serverRoutes";
import { WorkResults } from "./Results/Works";
import _ from "lodash";
import useDidMountEffect from "@hooks/useDidMountEffect";
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
  const [act, setAct] = useState<number>(
    Number(currentQueryStrings.act) ?? null
  );
  const [scene, setScene] = useState<number>(
    Number(currentQueryStrings.scene) ?? null
  );
  const [page, setPage] = useState<number>(
    Number(currentQueryStrings.page) ?? null
  );

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

  const searchUrl = getServerRouteURL(ServerRoutes.Search);

  const url = q ? `${searchUrl}?${query}` : "";

  const { data, error, loading } = useFetch(url);

  const resetAllFiltersExceptWorkId = () => {
    setCharId("");
    setAct(0);
    setScene(0);
    setPage(1);
  };

  const updateURL = () => {
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
  };

  useEffect(() => {
    if (previousWorkId && previousWorkId !== workId) {
      resetAllFiltersExceptWorkId();
    }

    updateURL();
  }, [workId, page, q]);

  // reset to first page character, act, or scene change, except on first load.
  useDidMountEffect(() => {
    setPage(1);
    updateURL();
  }, [charId, act, scene]);

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

      <ParagraphFilters
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

      {error ? (
        <div>Something went wrong..</div>
      ) : (
        <>
          <WorkResults data={data?.works?.hits ?? []} />
          <CharacterResults data={data?.characters?.hits ?? []} />
          <ParagraphResults
            data={data?.paragraphs?.hits ?? []}
            total={data?.paragraphs?.total ?? 0}
            isLoading={loading}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
};
