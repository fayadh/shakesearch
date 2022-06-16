import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePrevious = (value: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
