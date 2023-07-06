# `useRecapture`

[![npm](https://img.shields.io/npm/v/use-recapture)](https://npmjs.com/package/use-recapture)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/use-recapture)](https://bundlephobia.com/package/use-recapture)
[![codecov](https://codecov.io/gh/billykwok/use-recapture/branch/main/graph/badge.svg?token=I73J70MS2V)](https://codecov.io/gh/billykwok/use-recapture)
[![Test](https://github.com/billykwok/use-recapture/actions/workflows/test.yml/badge.svg)](https://github.com/billykwok/use-recapture/actions/workflows/test.yml)

Like `useCallback`, but

- Supports imperative recapturing so that you control when the callback runs with the latest values.
- Never causes unnecessary re-rendering because it always returns stable reference.
- Can be used as a building block for advanced hooks like [`useEffectEvent`](https://react.dev/learn/separating-events-from-effects#declaring-an-effect-event).

## Usage

This hook can be used for bridging imperative APIs.

```tsx
import { type ForwardedRef, type Ref, forwardRef } from 'react';
import { useRecapture } from 'use-recapture';
import { useOnReady } from 'some-imperative-api-1';
import { useOnEvent } from 'some-imperative-api-2';

export function Component(props) {
  const [callback, recapture] = useRecapture(
    // initial closure definition (optional, default to undefined)
    () => console.log('Not initialized yet'),
  );

  // you can recapture references imperatively
  useOnReady((api) => {
    recapture(
      () => console.log(api.latestValue), // will run with the newly captured value
    );
  });

  // callback is a stable reference, but runs with the newly captured value when recaptured
  // In this case, it will print 'Not initialized yet' on the first render, and imperativeValue after the imperative API is ready
  useOnEvent(callback);

  useEffect(() => {
    // ... some code with dependencies
    callback(); // print 'Not initialized yet' on the first render, and the latest value after the imperative API is ready
    // ... some code with dependencies
  }, [callback, /* dependencies */]); // callback is a stable reference, and never causes unnecessary effect rerun

  // callback is a stable reference, and never causes unnecessary re-rendering
  return <Child callback={callback}>;
}
```

You can even use this hook to define the experimental `useEventEffect` without using the experimental build of `react`:

```ts
export function useEventEffect<P extends any[] = any[]>(
  eventEffect: (...args: P) => void
) {
  const [callback, recapture] = useRecapture<P, void>(eventEffect);
  recapture(eventEffect);
  return callback;
}
```

## Support

This library is used in most of my personal projects, and is regarded as production-ready by myself. In the foreseeable future, I will continuously maintain and support this library.

## Issues and Feedback

Please voice your opinions and report bugs in the [issues](https://github.com/billykwok/use-recapture/issues) sections of this GitHub project.

## Contributing

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [`package.json`](https://github.com/billykwok/use-recapture/blob/main/package.json).

## License

MIT
