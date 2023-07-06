import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRecapture<P extends any[] = any[], R = void>(
  initialValue?: (...args: P) => R
): [(...args: P) => R, (callback?: ((...args: P) => R) | null) => void] {
  const ref = useRef<(...args: P) => R>(initialValue);
  const stableRef = useCallback((...args: P) => ref.current?.(...args), [ref]);
  const recapture = useCallback(
    (callback?: ((...args: P) => R) | null) => (ref.current = callback),
    [ref]
  );
  return [stableRef, recapture];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEventEffect<P extends any[] = any[]>(
  eventEffect: (...args: P) => void
) {
  const [callback, recapture] = useRecapture<P, void>(eventEffect);
  recapture(eventEffect);
  return callback;
}
