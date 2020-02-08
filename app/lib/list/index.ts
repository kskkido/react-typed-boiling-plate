export const init = <A>(xs: A[]): [A[], A] => [xs.slice(0, xs.length - 1), xs[xs.length - 1]];

export const zipWith = <A, B, C>(fn: (x: A, y: B, i: number) => C, xs: A[], ys: B[]): C[] => {
  const res: C[] = [];

  for (let i = 0; i < Math.min(xs.length, ys.length); i += 1) {
    res.push(fn(xs[i], ys[i], i));
  }

  return res;
};

export const dropWhile = <A>(pred: (x: A, i: number) => boolean, xs: A[]) => {
  let i = 0;

  while (i < xs.length && pred(xs[i], i)) {
    i += 1;
  }

  return xs.slice(i);
};
