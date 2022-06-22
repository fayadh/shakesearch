import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { IFormData } from "../..";
import React from "react";
import { ServerRoutes } from "@common/constants/serverRoutes";
import { TSetterFunction } from "..";
import { getServerRouteURL } from "@common/helpers";
import useFetch from "@hooks/useFetch";
import { useStyles } from "./styles";

interface ICharactersFilterProps extends Pick<IFormData, "workId" | "charId"> {
  setCharId: TSetterFunction;
}

/**
 * Characters filter.
 */
export const CharactersFilter: React.FC<ICharactersFilterProps> = ({
  charId,
  workId,
  setCharId,
}) => {
  const classes = useStyles();

  const url = getServerRouteURL(ServerRoutes.WorkCharacters);
  const { data = [], error, loading } = useFetch(`${url}?workId=${workId}`);

  const characters = data.map((d) => d._source);

  const labelId = "charId-label";

  return (
    <FormControl className={classes.root}>
      <InputLabel id={labelId}>Character</InputLabel>
      <Select
        autoWidth
        labelId={labelId}
        value={charId}
        onChange={(event) => {
          setCharId(event.target.value);
        }}
      >
        <MenuItem value="">*</MenuItem>
        {characters.map((character) => (
          <MenuItem key={character.CharID} value={character.CharID}>
            {character.CharName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
