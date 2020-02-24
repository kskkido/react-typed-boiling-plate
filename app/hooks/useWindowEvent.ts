import { useEffect } from 'react';

type EventType = (
  'resize'
);

const useWindowEvent = <E extends Event>(
  event: EventType,
  cb: (event: E) => void
) => {
  useEffect(
    () => {
      window.addEventListener(event, cb);
      return () => window.removeEventListener(event, cb);
    },
    [event, cb]
  )
} 

export default useWindowEvent;
