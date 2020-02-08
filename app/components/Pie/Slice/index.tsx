import React, { useMemo } from 'react';
import { animated, useSpring } from 'react-spring';
import { getArcPath } from 'lib/svg';
import { getArcCoordinate, average } from 'lib/math';
import ForeignObject from '../ForeignObject';

type Props = {
  className?: string;
  value: number;
  label?: React.ReactNode;
  outerRadius?: number;
  innerRadius?: number;
  start?: number;
  end?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};

const Slice: React.FC<Props> =({
  className,
  label,
  outerRadius: maxOuterRadius = 100,
  innerRadius = maxOuterRadius / 2,
  start = 0,
  end = 0,
  fill,
  stroke = '#fff',
  strokeWidth = 3
}) => {
  const outerRadius = useMemo(
    () => maxOuterRadius - (strokeWidth / 2),
    [maxOuterRadius, strokeWidth]
  );
  const labelCoordinate = useMemo(
    () => getArcCoordinate(average(innerRadius, outerRadius), average(start, end)),
    [innerRadius, outerRadius, start, end]
  );
  const { tweenEnd } = useSpring({
    tweenEnd: end,
    from: { tweenEnd: start },
  });

  return (
    <g>
      <animated.path
        className={className}
        d={tweenEnd.interpolate(x => getArcPath({ start, end: x, innerRadius, outerRadius }))}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {label && (
        <ForeignObject
          {...labelCoordinate}
          width={(outerRadius - innerRadius) * 0.8}
          height={(outerRadius - innerRadius) * 0.8}
        >
          {label}
        </ForeignObject>
      )}
    </g>
  );
}

export default Slice;
