import styles from './styles.css';
import React, { useContext, useMemo } from 'react';
import { useResponsiveClientRect } from '../hooks';
import { ViewBoxContext } from '../ViewBox';

type Props = {
  children: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
}

const ForeignObject: React.FC<Props> = ({ children, x, y, ...rest }) => {
  const [childRect, measuredRef] = useResponsiveClientRect();
  const { scaleX, scaleY } = useContext(ViewBoxContext);
  const anchorMiddleCoordinate = useMemo(
    () => childRect && { x: x - childRect.width / (scaleX * 2), y: y - childRect.height / (scaleY * 2) },
    [childRect, scaleX, scaleY]
  );

  return (
    <foreignObject {...rest} {...(anchorMiddleCoordinate || {})}>
      <div className={styles['child-container']} ref={measuredRef}>
        {children}
      </div>
    </foreignObject>
  );
}

export default ForeignObject;
