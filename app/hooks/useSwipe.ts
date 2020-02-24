import React, { useCallback, useRef } from 'react';
import { always, compose } from 'ramda';
import { condWithDefault } from 'lib/conditional';
import Vector, { subtract } from 'lib/vector';
import useWindowRect from 'hooks/useWindowRect';

export type Direction = (
  'up' |
  'down' |
  'left' |
  'right'
);

const direction = compose(
  condWithDefault<number, Direction>(
    [
      [angle => 135 >= angle && angle > 45 , always('up')],
      [angle => 215 >= angle && angle > 135, always('left')],
      [angle => 305 >= angle && angle > 215, always('down')],
    ],
    always('right')
  ),
  (v: Vector) => v.angle
);

const useSwipe = <E extends HTMLElement>(cb: (direction: Direction, speed: number) => void) => {
  const { width, height } = useWindowRect();
  const touchTimeRef = useRef<number>(new Date().getTime());
  const touchDistRef = useRef<Vector>(Vector.of(0, 0));
  const mouseTimeRef = useRef<number>(new Date().getTime());
  const mouseDistRef = useRef<Vector>(Vector.of(0, 0));

  const normalizedVector = useCallback(
    (x: number, y: number) => Vector.of(
      x - (width / 2),
      (height / 2) - y
    ),
    [width, height]
  );

  const onTouchStart = useCallback(
    ({ touches }: React.TouchEvent<E>) => {
      const touch = touches[0];

      touchTimeRef.current = new Date().getTime();
      touchDistRef.current = normalizedVector(touch.pageX, touch.pageY);
    },
    []
  );

  const onTouchEnd = useCallback(
    ({ touches }: React.TouchEvent<E>) => {
      const touch = touches[0];

      touchTimeRef.current = new Date().getTime() - touchTimeRef.current;
      touchDistRef.current = subtract(normalizedVector(touch.pageX, touch.pageY), touchDistRef.current); 
      cb(direction(touchDistRef.current), touchDistRef.current.magnitude / touchTimeRef.current);
    },
    []
  );

  const onMouseDown = useCallback(
    ({ clientX, clientY }: React.MouseEvent<E, MouseEvent>) => {
      mouseTimeRef.current = new Date().getTime();
      mouseDistRef.current = normalizedVector(clientX, clientY);
    },
    []
  );

  const onMouseUp = useCallback(
    ({ clientX, clientY }: React.MouseEvent<E, MouseEvent>) => {
      mouseTimeRef.current = new Date().getTime() - mouseTimeRef.current;
      mouseDistRef.current = subtract(normalizedVector(clientX, clientY), mouseDistRef.current);
      cb(direction(mouseDistRef.current),  mouseDistRef.current.magnitude / mouseTimeRef.current);
    },
    []
  );

  return {
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
  }
}

export default useSwipe;
