const { returnCount } = require('./server');

 test('increments a number if the "increment" parameter is provided', () => {
  expect(returnCount('increment', 2)).toBe(3);
});

test('decrements a number if the "decrement" parameter is provided', () => {
  expect(returnCount('decrement', 3)).toBe(2);
});

test('decrements a number if no parameter is provided', () => {
  expect(returnCount('', 7)).toBe(6);
});