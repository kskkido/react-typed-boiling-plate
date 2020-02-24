export const average = (...ns: number[]) => (
  ns.reduce((acc, n) => acc + n, 0) / ns.length
);

export const hypotenuse = (x: number, y: number) => (
  Math.sqrt(x ** 2 + y ** 2)
);

export const radian = (deg: number) => (
  deg * (Math.PI / 180)
);

export const degree = (rad: number) => {
  const d = rad * (180 / Math.PI);

  return d >= 0 ? d : (d + 360)
}

export const getArcCoordinate = (radius: number, angle: number) => ({
  x: radius * Math.cos(radian(angle)),
  y: radius * Math.sin(radian(angle))
});

export const getArcCoordinates = (radius: number, range: { start: number; end: number }) => ({
  start: getArcCoordinate(radius, range.start),
  end: getArcCoordinate(radius, range.end)
});
