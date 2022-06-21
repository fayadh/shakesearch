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
  const currentQueryStrings = getCurrentQueryStrings();

  // q is query
  const [q, setQ] = useState<string>(currentQueryStrings.q);
  const [workId, setWorkId] = useState<string>(currentQueryStrings.workId);
  const [charId, setCharId] = useState<string>(currentQueryStrings.charId);
  const [act, setAct] = useState<number>(Number(currentQueryStrings.act));
  const [scene, setScene] = useState<number>(Number(currentQueryStrings.scene));
  const [page, setPage] = useState<number>(Number(currentQueryStrings.page));

  const s = new URLSearchParams(
    cleanValues({
      q,
      workId,
      charId,
      act,
      scene,
      page,
    })
  ).toString();

  const url = q ? `http://localhost:3001/search?${s}` : "";

  const { data, error, loading } = useFetch(url);

  React.useEffect(() => {
    setCharId("");
    setAct(0);
    setScene(0);
    setPage(1);
  }, [workId]);

  React.useEffect(() => {
    const query = cleanValues({
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
