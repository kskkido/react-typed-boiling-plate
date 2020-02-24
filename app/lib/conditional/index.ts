import { always } from 'ramda';

export const cond = <V, R>(cases: [(v: V) => boolean, (v: V) => R][]) => (
  (value: V) => {
    for (const [pred, resolve] of cases) {
      if (pred(value)) {
        return resolve(value);
      }
    }
  }
)

export const condWithDefault = <V, R>(cases: [(v: V) => boolean, (v: V) => R][], fallback: (v: V) => R) => (
  cond<V, R>([
    ...cases,
    [always(true), fallback]
  ]) as (v: V) => R
);
