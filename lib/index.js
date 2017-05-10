"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function make(x, y) {
    return { x: x, y: y };
}
function add(a, b) {
    return make(a.x + b.x, a.y + b.y);
}
function scale(a, s) {
    return make(a.x * s, a.y * s);
}
function sub(a, b) {
    return add(a, scale(b, -1));
}
function len(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y);
}
function normalize(a) {
    var l = len(a);
    if (l == 0) {
        return make(1, 0);
    }
    else {
        return scale(a, 1 / l);
    }
}
function distance(a, b) {
    return len(sub(b, a));
}
function distanceSquared(a, b) {
    var v = sub(b, a);
    return dot(v, v);
}
// Ray from a to b
function ray(a, b) {
    return normalize(sub(b, a));
}
function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}
// Rotate vector v by t radians
function rotate(v, t) {
    var ct = Math.cos(t);
    var st = Math.sin(t);
    return make(ct * v.x - st * v.y, st * v.x + ct * v.y);
}
// Angle between two normalized vectors with sign
function angle(a, b) {
    var t = Math.atan2(b.y, b.x) - Math.atan2(a.y, a.x);
    if (t < 0) {
        return 2 * Math.PI + t;
    }
    else {
        return t;
    }
}
function rayFromAngle(t) {
    return make(Math.cos(t), Math.sin(t));
}
// Rotate from a towards b, by a maximum of 't' radians.
function rotateToward(a, b, t) {
    var full = angle(a, b);
    if (full == 0 || Math.abs(full) < t) {
        return b;
    }
    else {
        if (full > Math.PI) {
            return rotate(a, -t);
        }
        else {
            return rotate(a, t);
        }
    }
}
function interpolate(a, b, t) {
    var d = sub(b, a);
    return add(a, scale(d, t));
}
function isEqual(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) < 0.000001;
}
function zero() {
    return make(0, 0);
}
function randomRay() {
    var t = 2 * Math.PI * Math.random();
    return rotate(make(1, 0), t);
}
function fromPolar(v) {
    return scale(rayFromAngle(v.t), v.r);
}
function toPolar(v) {
    return {
        t: Math.atan2(v.y, v.x),
        r: len(v)
    };
}
exports.default = {
    make: make,
    add: add,
    scale: scale,
    sub: sub,
    len: len,
    normalize: normalize,
    distance: distance,
    distanceSquared: distanceSquared,
    ray: ray,
    dot: dot,
    rotate: rotate,
    angle: angle,
    rayFromAngle: rayFromAngle,
    rotateToward: rotateToward,
    interpolate: interpolate,
    isEqual: isEqual,
    zero: zero,
    randomRay: randomRay,
    fromPolar: fromPolar,
    toPolar: toPolar
};
