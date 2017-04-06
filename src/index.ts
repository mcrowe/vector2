export interface Vector2 { x: number, y: number }
export interface PolarVector2 { t: number, r: number }


function make(x: number, y: number): Vector2 {
  return { x, y }
}


function add(a: Vector2, b: Vector2): Vector2 {
  return make(a.x + b.x, a.y + b.y)
}


function scale(a: Vector2, s: number): Vector2 {
  return make(a.x * s, a.y * s)
}


function sub(a: Vector2, b: Vector2): Vector2 {
  return add(a, scale(b, -1))
}


function len(a: Vector2): number {
  return Math.sqrt(a.x * a.x + a.y * a.y)
}


function normalize(a: Vector2): Vector2 {
  const l = len(a)
  if (l == 0) {
    return make(1, 0)
  } else {
    return scale(a, 1/l)
  }
}


function distance(a: Vector2, b: Vector2): number {
  return len(sub(b, a))
}


function distanceSquared(a: Vector2, b: Vector2): number {
  const v = sub(b, a)
  return dot(v, v)
}


// Ray from a to b
function ray(a: Vector2, b: Vector2): Vector2 {
  return normalize(sub(b, a))
}


function dot(a: Vector2, b: Vector2): number {
  return a.x * b.x + a.y * b.y
}


// Rotate vector v by t radians
function rotate(v: Vector2, t: number): Vector2 {
  const ct = Math.cos(t)
  const st = Math.sin(t)
  return make( ct*v.x - st*v.y, st*v.x + ct*v.y )
}



// Angle between two normalized vectors with sign
function angle(a: Vector2, b: Vector2): number {
  const t = Math.atan2(b.y, b.x) - Math.atan2(a.y, a.x)

  if (t < 0) {
    return 2*Math.PI + t
  } else {
    return t
  }
}


function rayFromAngle(t: number): Vector2 {
  return make(Math.cos(t), Math.sin(t))
}


// Rotate from a towards b, by a maximum of 't' radians.
function rotateToward(a: Vector2, b: Vector2, t: number): Vector2 {
  const full = angle(a, b)

  if (full == 0 || Math.abs(full) < t) {
    return b
  } else {
    if (full > Math.PI) {
      return rotate(a, -t)
    } else {
      return rotate(a, t)
    }
  }
}


function interpolate(a: Vector2, b: Vector2, t: number): Vector2 {
  const d = sub(b, a)
  return add(a, scale(d, t))
}


function isEqual(a: Vector2, b: Vector2): boolean {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) < 0.000001
}


function zero(): Vector2 {
  return make(0, 0)
}


function randomRay(): Vector2 {
  const t = 2 * Math.PI * Math.random()
  return rotate(make(1, 0), t)
}


function fromPolar(v: PolarVector2): Vector2 {
  return scale(rayFromAngle(v.t), v.r)
}


function toPolar(v: Vector2): PolarVector2 {
  return {
    t: Math.atan2(v.y, v.x),
    r: len(v)
  }
}


export default {
  make,
  add,
  scale,
  sub,
  len,
  normalize,
  distance,
  distanceSquared,
  ray,
  dot,
  rotate,
  angle,
  rayFromAngle,
  rotateToward,
  interpolate,
  isEqual,
  zero,
  randomRay,
  fromPolar,
  toPolar
}