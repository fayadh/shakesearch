import { ENV } from "@common/constants/environment";
import { ServerRoutes } from "@common/constants/serverRoutes";
import _ from "lodash";
import { parse } from "query-string";

export const doNothing = () => null;

export const getCurrentQueryStrings = () => {
  return parse(location.search) as Record<string, string>;
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

/**
 * Sets the value of field in the current URL query with causing a page reload.
 *
 * @param field string.
 * @param value string.
 */
export const setUrlQueryPart = (field: string, value: string) => {
  const {
    location: { origin, pathname, href },
  } = window;
  const url = new URL(href);
  url.searchParams.set(field, value);
  window.history.replaceState({}, `Shakesearch`, url.href);
};

/**
 * Gets the value of field in the current URL query.
 *
 * @param field string.
 */
export const getUrlQueryPart = (field: string) => {
  const {
    location: { href },
  } = window;
  const url = new URL(href);
  return url.searchParams.get(field);
};

/**
 * Shape a route relative to the server URL.
 *
 * @param route string.
 */
export const getServerRouteURL = (route: ServerRoutes) => {
  return `${ENV.serverURL}${route}`;
};

/**
 * Remove empty values from an object.
 *
 * @param obj The object you want to remove empty values from.
 * @returns obj
 */
export const removeEmptyValues = (obj: Record<string, unknown>) => {
  const newValues = _.omitBy(obj, (value) => {
    return _.isNil(value) || !value;
  });

  return newValues;
};
