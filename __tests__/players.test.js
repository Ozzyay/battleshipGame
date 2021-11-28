const players = require('../src/players');

const player = players({ playerName: 'Andy' });

test('checking if player name is set correct', () => {
  expect(player.playerName).toBe('Andy');
});

test('checking if player turn is working correctly', () => {
  expect(player.playTurn()).toBeTruthy();
});

test('checking if turn is properly toggled', () => {
  expect(player.currentTurn).toBeFalsy();
});
