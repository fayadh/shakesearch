const isError = (error: unknown): error is Error => (error as Error).message !== undefined;

export const getErrorFromUnknown = (error: unknown, defaultErrorMessage?: string): Error => {
  if (isError(error)) {
    return error;
  }

  // TODO: this needs to be improved in case of objects/arrays
  return new Error(defaultErrorMessage || String(error));
};
