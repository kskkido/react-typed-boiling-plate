import React, { createContext, useMemo } from 'react';
import { useResponsiveClientRect } from '../hooks';

type Props = {
  children: React.ReactNode;
  radius: number;
  className?: string;
}

type State = {
  scaleX: number;
  scaleY: number;
}

const ViewBoxContext = createContext<State>({
  scaleX: 0,
  scaleY: 0
});

const ViewBox: React.FC<Props> = ({ children, className, radius }) => {
  const diameter = useMemo(() => radius * 2, [radius]);
  const [{ width, height } = { width: diameter, height: diameter }, measuredRef] = useResponsiveClientRect();
  console.log(width, height, { scaleX: width / diameter, scaleY: height / diameter }, 'unko');

  return (
    <ViewBoxContext.Provider value={{ scaleX: width / diameter, scaleY: height / diameter }}>
      <svg
        className={className}
        style={{ maxWidth: diameter }}
        viewBox={`${-radius} ${-radius} ${diameter} ${diameter}`}
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        ref={measuredRef}
      >
        {children}
      </svg>
    </ViewBoxContext.Provider>
  );
}

export { ViewBoxContext };
export default ViewBox;
