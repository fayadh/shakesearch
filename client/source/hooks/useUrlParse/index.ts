import { parse, ParsedQuery, ParseOptions } from 'query-string';

const parseDeepStrings = (object: ParsedQuery) =>
  Object.entries(object).reduce((acc, entry) => {
    const [key, value] = entry;

    if (typeof value === 'string') {
      try {
        acc[key] = JSON.parse(value);
      } catch {
        // no need to parse, keep looping
      }
    }

    return acc;
  }, object);

/**
 * Parses the requested url section and returns an object with the
 * resulting values. The second parameter is an options object used
 * during parse. See supported option params at query-string npm module.
 *
 * @param {string} section - Section of the location object.
 * @param {ParseOptions} options - Npm "query-string" package parse options.
 */
const useUrlParse = (section: keyof Location, options: ParseOptions): ParsedQuery<string> => {
  const {
    location: { [section]: urlSection = 'search' },
  } = window;
  const decodedString = decodeURIComponent(urlSection as string);
  const shallowParsedUrl = parse(decodedString as string, options);

  return parseDeepStrings(shallowParsedUrl);
};

export default useUrlParse;
