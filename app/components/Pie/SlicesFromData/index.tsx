import React, { useMemo } from 'react';
import { zipWith } from 'lib/list';
import { useSliceAngles } from '../hooks';
import Slice from '../Slice';

type Props = {
  datas: Data[];
  outerRadius: number;
  innerRadius: number;
  rotation: number;
  stroke?: string;
  strokeWidth?: number;
};

export type Data = {
  value: number;
  className?: string;
  fill?: string;
  label?: React.ReactNode;
};

const SlicesFromData: React.FC<Props> = ({
  datas,
  outerRadius,
  innerRadius,
  rotation,
  stroke,
  strokeWidth
}) => {
  const sliceAngles = useSliceAngles(datas.map(({ value }) => value));

  const slices = useMemo(
    () =>
      zipWith(
        (props, { start, end, value }, i) => (
          <Slice
            {...props}
            key={`slice_${i}`}
            value={value}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            start={start + rotation}
            end={end + rotation}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        ),
        datas,
        sliceAngles
      ),
    [datas, sliceAngles]
  );

  return <>{slices}</>;
}

export default SlicesFromData;
