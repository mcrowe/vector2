export interface Vector2 {
    x: number;
    y: number;
}
export interface PolarVector2 {
    t: number;
    r: number;
}
declare var _default: {
    make: (x: number, y: number) => Vector2;
    add: (a: Vector2, b: Vector2) => Vector2;
    scale: (a: Vector2, s: number) => Vector2;
    sub: (a: Vector2, b: Vector2) => Vector2;
    len: (a: Vector2) => number;
    normalize: (a: Vector2) => Vector2;
    distance: (a: Vector2, b: Vector2) => number;
    distanceSquared: (a: Vector2, b: Vector2) => number;
    ray: (a: Vector2, b: Vector2) => Vector2;
    dot: (a: Vector2, b: Vector2) => number;
    rotate: (v: Vector2, t: number) => Vector2;
    angle: (a: Vector2, b: Vector2) => number;
    rayFromAngle: (t: number) => Vector2;
    rotateToward: (a: Vector2, b: Vector2, t: number) => Vector2;
    interpolate: (a: Vector2, b: Vector2, t: number) => Vector2;
    isEqual: (a: Vector2, b: Vector2) => boolean;
    zero: () => Vector2;
    randomRay: () => Vector2;
    fromPolar: (v: PolarVector2) => Vector2;
    toPolar: (v: Vector2) => PolarVector2;
};
export default _default;
