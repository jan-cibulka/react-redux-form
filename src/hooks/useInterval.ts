import { useRef, useEffect } from 'react';

export declare type fArgVoid = (...args: any[]) => void;
export const useInterval = (callback: fArgVoid, delay: number): void => {
  const savedCallback = useRef<fArgVoid>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args: any) => savedCallback.current?.(...args);
    handler();
    if (delay !== null) {
      const id = setInterval(handler, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
