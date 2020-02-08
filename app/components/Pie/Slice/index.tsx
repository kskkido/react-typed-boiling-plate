import React, { useMemo } from 'react';
import ForeignObject from '../ForeignObject';

const average = (...ns: number[]) => ns.reduce((acc, n) => acc + n, 0) / ns.length;

const radian = (deg: number) => deg * (Math.PI / 180);

const getCoordinate = (radius: number, angle: number) => ({
  x: radius * Math.cos(radian(angle)),
  y: radius * Math.sin(radian(angle))
});

const getCoordinates = (radius: number, range: { start: number; end: number }) => ({
  start: getCoordinate(radius, range.start),
  end: getCoordinate(radius, range.end)
});

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
  const outerRadius = useMemo(() => maxOuterRadius - (strokeWidth / 2), [maxOuterRadius, strokeWidth])
  const arcFlag = useMemo(() => (end - start > 180 ? 1 : 0), [start, end]);

  const { innerCoordinates, outerCoordinates, labelCoordinate } = useMemo(
    () => ({
      innerCoordinates: getCoordinates(innerRadius, { start, end }),
      outerCoordinates: getCoordinates(outerRadius, { start, end }),
      labelCoordinate: getCoordinate(average(innerRadius, outerRadius), average(start, end))
    }),
    [innerRadius, outerRadius, start, end]
  );

  const paths = useMemo(
    () =>
      [
        `M ${outerCoordinates.start.x} ${outerCoordinates.start.y}`,
        `A ${outerRadius} ${outerRadius} 0 ${arcFlag} 1 ${outerCoordinates.end.x} ${outerCoordinates.end.y}`,
        `L ${innerCoordinates.end.x} ${innerCoordinates.end.y}`,
        `A ${innerRadius} ${innerRadius} 0 ${arcFlag} 0 ${innerCoordinates.start.x} ${innerCoordinates.start.y}`,
        'Z'
      ].join(' '),
    [innerCoordinates, outerCoordinates]
  );

  return (
    <g>
      <path className={className} d={paths} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
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
