import React from 'react';
import ViewBox from './ViewBox';
import ForeignObject from './ForeignObject';
import SlicesFromChildren from './SlicesFromChildren';
import SlicesFromData, { Data } from './SlicesFromData';
import Slice from './Slice';

type Props = {
  children?: React.ReactNode;
  className?: string;
  datas?: Data[];
  title?: React.ReactNode;
  outerRadius: number;
  innerRadius: number;
  rotation?: number;
  stroke?: string;
  strokeWidth?: number;
};

const baseRotation = 270;

const Pie: React.FC<Props> = ({
  children,
  datas = [],
  title,
  outerRadius,
  innerRadius,
  rotation = 0,
  ...rest
}) => {
  return (
    <ViewBox radius={outerRadius} {...rest}>
      {datas.length ? (
        <SlicesFromData
          datas={datas}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          rotation={rotation + baseRotation}
          {...rest}
        />
      ) : (
        <SlicesFromChildren
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          rotation={rotation + baseRotation}
          {...rest}
        >
          {children}
        </SlicesFromChildren>
      )}
      {title && (
        <ForeignObject x={0} y={0} height={innerRadius} width={innerRadius * 1.5}>
          {title}
        </ForeignObject>
      )}
    </ViewBox>
  );
}

export default Object.assign(Pie, { Slice });
