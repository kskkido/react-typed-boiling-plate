import { degree, radian, hypotenuse } from 'lib/math';

export const add = (vx: Vector, vy: Vector) => (
  Vector.of(
    vx.x + vy.x,
    vx.y + vy.y
  )
);

export const subtract = (vx: Vector, vy: Vector) => (
  Vector.of(
    vx.x - vy.x,
    vx.y - vy.y
  )
);

export const divide = (vx: Vector, vy: Vector) => (
  Vector.of(
    vx.x / vy.x,
    vx.y / vy.y
  )
);

export const multiply = (vx: Vector, vy: Vector) => (
  Vector.of(
    vx.x * vy.x,
    vx.y * vy.y
  )
);

class Vector {
  private _x: number;
  private _y: number;

  static of(x: number, y: number) {
    return new Vector(
      x,
      y
    );
  }

  static from(v: Vector) {
    return Vector.of(
      v.x,
      v.y
    );
  }

  protected constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x(){
    return this._x;
  }

  get y() {
    return this._y;
  }

  get angle() {
    return degree(Math.atan2(
      this.y,
      this.x
    ));
  }

  set angle(d: number) {
    this._x = this.magnitude * Math.cos(radian(d))
    this._y = this.magnitude * Math.sin(radian(d))
  }

  get magnitude() {
    return hypotenuse(
      this.x,
      this.y
    )
  }

  set magnitude(l: number) {
    const angle = this.angle;

    this._x = l * Math.cos(radian(angle));
    this._y = l * Math.sin(radian(angle));
  };
} 

export default Vector
