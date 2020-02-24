export const diffMs = (dateX: Date, dateY: Date) => (
  dateX.getTime() - dateY.getTime()
);

export const diffSec = (dateX: Date, dateY: Date) => (
  diffMs(dateX, dateY) / 1000
);
