import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { zipWith, init } from 'lib/list';

export const useWindowEvent = (event: string, cb: () => void) => {
  useEffect(() => {
    window.addEventListener(event, cb);
    return () => window.removeEventListener(event, cb);
  }, [event, cb]);
}

export const useClientRect = () => {
  const [rect, setRect] = useState();

  const setRectFromRef = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return [rect, setRectFromRef];
}

export const useResponsiveClientRect = () => {
  const [rect, setRectFromRef] = useClientRect();
  const realRef = useRef<HTMLElement>();

  const storeAndSetMeasuredRef = useCallback((node: HTMLElement) => {
    realRef.current = node;
    setRectFromRef(node);
  }, []);

  const boundedSetRectFromRef = useCallback(() => {
    if (realRef.current) {
      setRectFromRef(realRef.current);
    }
  }, []);

  useWindowEvent('resize', boundedSetRectFromRef);

  return [rect, storeAndSetMeasuredRef];
}

export const useSliceAngles = (values: number[]) => {
  const toAngle = (ratio: number) => ratio * (360 * 0.999999);
  const [startValues, sum] = useMemo(
    () =>
      init(
        values.reduce(
          (acc, value) => {
            const curr = acc[acc.length - 1];
            const next = curr + value;

            return [...acc, next];
          },
          [0]
        )
      ),
    [values]
  );

  const angles = useMemo(
    () =>
      zipWith(
        (start, value) => ({ value, start: toAngle(start / (sum || 1)), end: toAngle((start + value) / (sum || 1)) }),
        startValues,
        values
      ),
    [startValues, values, sum]
  );

  return angles;
}
