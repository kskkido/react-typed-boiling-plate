import React from 'react';
import useSwipe, { Direction } from 'hooks/useSwipe';

type Props = {
  children: React.ReactNode;
  threshold?: number;
  onChange: (direction: Direction) => void;
}

const Swiper: React.FC<Props> = ({
  children,
  threshold = 0.75,
  onChange,
}) => {
  const { onMouseDown, onMouseUp } = useSwipe((d, s) => (
    s > threshold && onChange(d)
  ));

  return (
    <div
      style={{ width: '100vw', height: '100vh' }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </div>
  )
}

export default Swiper;
