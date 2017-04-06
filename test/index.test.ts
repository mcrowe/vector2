import assert = require('assert')
import Vec from '../src'


function assertVec(expected, actual) {
  const msg = `Expected vectors to match ${JSON.stringify(expected)} ${JSON.stringify(actual)}`
  assert(Math.abs(expected.x - actual.x) < 0.001, msg)
  assert(Math.abs(expected.y - actual.y) < 0.001, msg)
}


const PI = Math.PI


function up() {
  return {x: 0, y: 1}
}

function down() {
  return {x: 0, y: -1}
}

function right() {
  return {x: 1, y: 0}
}

function left() {
  return {x: -1, y: 0}
}

function downLeft() {
  const d = 1/Math.sqrt(2)
  return {x: -d, y: -d}
}


test('add', () => {
  assertVec({x: 5, y: 7}, Vec.add({x: 1, y: 2}, {x: 4, y: 5}))
})

test('angle', () => {
  const a = up()
  const b = right()
  assert.equal(3*PI/2, Vec.angle(a, b))
  assert.equal(PI/2, Vec.angle(b, a))
  assert.equal(PI, Vec.angle(right(), left()))
  assert.equal(3*PI/4, Vec.angle(up(), downLeft()))
})

test('rayFromAngle', () => {
  assertVec(right(), Vec.rayFromAngle(0))
  assertVec(up(), Vec.rayFromAngle(PI/2))
  assertVec(down(), Vec.rayFromAngle(-PI/2))
  assertVec(left(), Vec.rayFromAngle(-PI))
  assertVec(left(), Vec.rayFromAngle(3*PI))
  assertVec(right(), Vec.rayFromAngle(2*PI))
})

test('rotate', () => {
  assertVec(left(), Vec.rotate(up(), PI/2))
  assertVec(right(), Vec.rotate(up(), -PI/2))
  assertVec(up(), Vec.rotate(up(), 2*PI))
})

test('rotateToward', () => {
  assertVec(left(), Vec.rotateToward(up(), downLeft(), PI/2))
  assertVec(downLeft(), Vec.rotateToward(up(), downLeft(), 2*PI))
  // takes the short path
  assertVec(left(), Vec.rotateToward(downLeft(), left(), PI/4))
})