'use strict';

const { sum, mult } = require('../lib.js');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('multiply 2 * 2 to equal 4', () => {
  expect(mult(2, 2)).toBe(4);
});
