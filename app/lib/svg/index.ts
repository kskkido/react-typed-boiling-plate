import * as math from 'lib/math';

type ArcParameters = {
  start: number;
  end: number;
  innerRadius: number;
  outerRadius: number;
}

export const getArcPath = ({ start, end ,innerRadius, outerRadius }: ArcParameters) => {
  const arcFlag = end - start > 180 ? 1 : 0;
  const innerCoordinates = math.getArcCoordinates(innerRadius, { start, end });
  const outerCoordinates = math.getArcCoordinates(outerRadius, { start, end });

  return [
    `M ${outerCoordinates.start.x} ${outerCoordinates.start.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${arcFlag} 1 ${outerCoordinates.end.x} ${outerCoordinates.end.y}`,
    `L ${innerCoordinates.end.x} ${innerCoordinates.end.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${arcFlag} 0 ${innerCoordinates.start.x} ${innerCoordinates.start.y}`,
    'Z'
  ].join(' ')
};
