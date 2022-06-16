import currency, { Options } from 'currency.js';

interface ICurrencyProps extends Options {
  value: number;
  exchangeRate?: number;
  locale?: keyof typeof locales;
}

const defaultExchangeRate = 1;
const defaultLocale = 'US';

/**
 * Supplying US here as an example, however the US options are supplied by default.
 *
 * Disabling the naming convention ESLINT rule, as country codes are typically completely uppercase.
 */
/* eslint-disable @typescript-eslint/naming-convention */
const locales: Record<string, Options> = {
  US: {
    decimal: '.',
    separator: ',',
    symbol: '$',
  },
};
/* eslint-enable */

/**
 * Returns a currency string for display.
 *
 * We spread the `locales` object after the supplied `restOfProps` param so that we don't overwrite options declared in this file for any display currency.
 * @param props - Props object.
 * @param props.value - The price value to be formatted.
 * @param [props.exchangeRate] - The exchange rate for updating the front end display prices based on locale.
 * @param [props.locale] - A number representing the closest number to round to.
 * @param [props.restOfProps] - Any of the Options supported by currency.js.
 */
export const formatCurrency = ({
  value,
  locale = defaultLocale,
  exchangeRate = defaultExchangeRate,
  ...restOfProps
}: ICurrencyProps): string =>
  currency(value, { ...restOfProps, ...(locales[locale] ?? locales[defaultLocale]) })
    .multiply(exchangeRate)
    .format();
