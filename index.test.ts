/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react';
import { describe, expect, jest, test } from '@jest/globals';

import { useRecapture, useEventEffect } from './index';

describe('useRecapture', () => {
  test('should not throw if callback is nullish', () => {
    const { result, rerender } = renderHook(() => useRecapture());
    const state = {
      get callback() {
        return result.current[0];
      },
      get recapture() {
        return result.current[1];
      },
    };
    expect(() => act(() => state.callback())).not.toThrow();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    act(() => state.recapture(() => {}));
    rerender();
    expect(() => act(() => state.callback())).not.toThrow();
  });

  test('should maintain stable reference after recapture', () => {
    const version1 = jest.fn((i: number | string) =>
      console.log(`Version 1 called with "${i}"`),
    );
    const version2 = jest.fn((i: number | string) =>
      console.log(`Version 2 called with "${i}"`),
    );

    const { result, rerender } = renderHook(() =>
      useRecapture<[i: number | string], void>(version1),
    );
    const state = {
      get callback() {
        return result.current[0];
      },
      get recapture() {
        return result.current[1];
      },
    };
    const stableReference = {
      callback: state.callback,
      recapture: state.recapture,
    };
    expect(version1).not.toHaveBeenCalled();

    act(() => state.callback('test 1'));
    expect(state.callback).toBe(stableReference.callback);
    expect(state.recapture).toBe(stableReference.recapture);
    expect(version1).toHaveBeenCalledTimes(1);
    expect(version1).toHaveBeenCalledWith('test 1');

    act(() => state.recapture(version2));
    rerender();
    expect(state.callback).toBe(stableReference.callback);
    expect(state.recapture).toBe(stableReference.recapture);
    expect(version1).toHaveBeenCalledTimes(1);

    act(() => state.callback('test 2'));
    expect(state.callback).toBe(stableReference.callback);
    expect(state.recapture).toBe(stableReference.recapture);
    expect(version1).toHaveBeenCalledTimes(1);
    expect(version2).toHaveBeenCalledTimes(1);
    expect(version2).toHaveBeenCalledWith('test 2');
  });
});

describe('useEventEffect', () => {
  test('should maintain stable reference after recapture', () => {
    const version1 = jest.fn((i: number | string) =>
      console.log(`Version 1 called with "${i}"`),
    );
    const version2 = jest.fn((i: number | string) =>
      console.log(`Version 2 called with "${i}"`),
    );

    const { result, rerender } = renderHook(
      (effect) => useEventEffect(effect),
      { initialProps: version1 },
    );
    const stableReference = result.current;
    expect(version1).not.toHaveBeenCalled();

    act(() => result.current('test 1'));
    expect(result.current).toBe(stableReference);
    expect(version1).toHaveBeenCalledTimes(1);
    expect(version1).toHaveBeenCalledWith('test 1');

    rerender(version2);
    expect(result.current).toBe(stableReference);
    expect(version1).toHaveBeenCalledTimes(1);

    act(() => result.current('test 2'));
    expect(result.current).toBe(stableReference);
    expect(version1).toHaveBeenCalledTimes(1);
    expect(version2).toHaveBeenCalledTimes(1);
    expect(version2).toHaveBeenCalledWith('test 2');
  });
});
