import React from 'react';
import { GetProps } from 'types/utility';
import { zipWith } from 'lib/list';
import { useSliceAngles } from '../hooks';
import Slice from '../Slice';

type Props = {
  children: React.ReactNode;
  innerRadius: number;
  outerRadius: number;
  rotation: number;
}

type SliceElement = React.ReactElement<GetProps<typeof Slice>>;

const isSliceNode = (node: React.ReactNode): node is SliceElement => {
  return React.isValidElement(node) && node.type === Slice;
}

const SlicesFromChildren: React.FC<Props> = ({
  children,
  innerRadius,
  outerRadius,
  rotation
}) => {
  const slices = React.Children.toArray(children).filter(isSliceNode) as SliceElement[];
  const angles = useSliceAngles(slices.map((slice) => slice.props.value));

  return (
    <>
      {zipWith(
        (slice, { start, end }) =>
          React.cloneElement(slice, {
            innerRadius,
            outerRadius,
            start: start + rotation,
            end: end + rotation
          }),
        slices,
        angles
      )}
    </>
  );
};

export default SlicesFromChildren;
