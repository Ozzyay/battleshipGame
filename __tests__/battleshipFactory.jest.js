const battleshipFactory = require('../src/battleshipFactory');

let battleship = battleshipFactory({ name: 'Destroyer', length: 4, position: ['01', '02', '03', '04'] });

beforeEach(() => {
  battleship.hit('1');
  battleship.hit('2');
  battleship.hit('3');
});

test('check if final hit is working propery', () => {
  expect(battleship.hit('4')).toBe('Your Destroyer has been sunk!');
});
test('check if hit function works', () => {
  expect(battleship.hitArea.length).toBe(3);
});

test('check if sunktoggle works', () => {
  expect(battleship.sunk).toBe(true);
});
afterEach(() => {
  battleship = battleshipFactory({ name: 'Destroyer', length: 4, position: ['01', '02', '03'] });
});
