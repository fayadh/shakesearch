import { parse } from "query-string";

export const doNothing = () => null;

export const getCurrentQueryStrings = () => {
  return parse(location.search);
};

/**
 * Sets the current URL to a given location.
 *
 * @param location string.
 */
export const setUrl = (url: string) => {
  window.history.replaceState({}, `Shakesearch`, url);
};

/**
 * Sets the current URL to a given location without causing a page reload.
 *
 * @param location string.
 */
export const setUrlQuery = (query: string) => {
  const {
    location: { origin, pathname },
  } = window;
  window.history.replaceState(
    {},
    `Shakesearch`,
    `${origin}${pathname}?${query}`
  );
};
