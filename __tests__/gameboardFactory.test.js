const gameBoard = require('../src/gameboardFactory');

const testBoard = new gameBoard();

test('checking the legality parameters for vertical ships', () => {
  expect(testBoard.checkPlacement(29, 'vertical', 5)).toBeFalsy();
});

test('checking the legality parameters for horizontal ships', () => {
  expect(testBoard.checkPlacement(57, 'horizontal', 4)).toBeFalsy();
});

test('checking if checkPlacement for vertical returns an array of coordinates', () => {
  expect(testBoard.checkPlacement(84, 'vertical', 4)).toStrictEqual([84, 74, 64, 54]);
});

test('checking if checkPlacement for horizontal returns an array of coordinates and ends in a row end', () => {
  expect(testBoard.checkPlacement(17, 'horizontal', 3)).toStrictEqual([17, 18, 19]);
});

describe('checkingObjectProperties', () => {
  beforeEach(() => {
    testBoard.confirmPlacement([80, 81, 82]);
  });
  test('checking if placement was done', () => {
    expect(testBoard.board[80].shipPlacement).toBeTruthy();
  });
  test('checking if hit is working', () => {
    expect(testBoard.receiveAttack(80)).toStrictEqual('Hit');
  });
});
