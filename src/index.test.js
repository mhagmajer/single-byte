/* @flow */

const { encode, decode } = require('./index');

test('it works', () => {
  const name = 'mazovia';
  const s = 'ąćęłńóśźżĄĆĘŁŃÓŚŹŻ\n\t';
  expect(decode(name, encode(name, s))).toBe(s);
});
