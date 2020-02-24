import { useState, useCallback } from 'react';
import useWindowEvent from 'hooks/useWindowEvent';

const useWindowRect = () => {
  const [rect, setRect] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const onResize = useCallback(
    () => setRect({
      width: window.innerWidth,
      height: window.innerHeight
    }),
    [setRect]
  );

  useWindowEvent('resize', onResize);
  return rect;
}

export default useWindowRect;
