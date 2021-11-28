/* eslint-disable class-methods-use-this */
class GameBoard {
  constructor() {
    this.board = [];
    this.ships = 0;
    if (this.board.length < 100) {
      this.createBoard();
    }
    this.destroyer = {};
    this.cruiser = {};
    this.submarine = {};
    this.carrier = {};
    this.battleship = {};
  }

  createBoard() {
    for (let i = 0; i < 100; i++) {
      this.board.push({ shipPlacement: false, beenShot: false, occupant: '' });
    }
  }

  receiveAttack(coordinates) {
    if (this.board[coordinates].beenShot === false) {
      if (this.board[coordinates].shipPlacement === true) {
        this.board[coordinates].beenShot = true;
        return this.board[coordinates].occupant.hit();
      }
    }
    return false;
  }

  checkLegalityVertical(startingCoordinate, length) {
    const coords = [startingCoordinate];
    for (let i = 1; i < length; i += 1) {
      const n = i * 10;
      const newloc = startingCoordinate - n;
      if (newloc >= 0) {
        coords.push(newloc);
      } else {
        return false;
      }
    }
    const check = coords.reduce((prev, curr) => Math.max(prev, curr), 0);
    if (check !== startingCoordinate) {
      return false;
    }
    return coords;
  }

  checkLegalityHorizontal(startingCoordinate, length) {
    const coords = [startingCoordinate];
    const rowEnds = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    for (let i = 1; i < length; i++) {
      const x = startingCoordinate + i;
      coords.push(x);
    }
    // eslint-disable-next-line no-unreachable-loop
    const testArray = coords.slice(0, -1);
    const testResults = testArray.map((element) => rowEnds.includes(element));
    if (testResults.includes(true)) {
      return false;
    }
    return coords;
  }

  // eslint-disable-next-line consistent-return
  checkPlacement(startingCoordinate, direction, length) {
    if (direction === 'vertical') {
      if (this.checkLegalityVertical(startingCoordinate, length) === false) {
        return false;
      }
      return this.checkLegalityVertical(startingCoordinate, length);
    } if (direction === 'horizontal') {
      if (this.checkLegalityHorizontal(startingCoordinate, length) === false) {
        return false;
      }
      return this.checkLegalityHorizontal(startingCoordinate, length);
    }
  }

  confirmPlacement(coordinatesArray, obj) {
    const legitArray = [];
    for (let i = 0; i < coordinatesArray.length; i += 1) {
      if (this.board[coordinatesArray[i]].shipPlacement === false) {
        legitArray.push(coordinatesArray[i]);
      }
    }
    if (legitArray.length === coordinatesArray.length) {
      if (obj.name === 'submarine') {
        this.submarine = obj;
        for (let i = 0; i < legitArray.length; i += 1) {
          this.board[legitArray[i]].shipPlacement = true;
          this.board[legitArray[i]].occupant = this.submarine;
        }
      }
      if (obj.name === 'destroyer') {
        this.destroyer = obj;
        for (let i = 0; i < legitArray.length; i += 1) {
          this.board[legitArray[i]].shipPlacement = true;
          this.board[legitArray[i]].occupant = this.destroyer;
        }
      }
      if (obj.name === 'battleship') {
        this.battleship = obj;
        for (let i = 0; i < legitArray.length; i += 1) {
          this.board[legitArray[i]].shipPlacement = true;
          this.board[legitArray[i]].occupant = this.battleship;
        }
      }
      if (obj.name === 'carrier') {
        this.carrier = obj;
        for (let i = 0; i < legitArray.length; i += 1) {
          this.board[legitArray[i]].shipPlacement = true;
          this.board[legitArray[i]].occupant = this.carrier;
        }
      }
      if (obj.name === 'cruiser') {
        this.cruiser = obj;
        for (let i = 0; i < legitArray.length; i += 1) {
          this.board[legitArray[i]].shipPlacement = true;
          this.board[legitArray[i]].occupant = this.cruiser;
        }
      }
      return true;
    }
    return false;
  }

  checkBoard() {
    const unhit = [];
    for (let i = 0; i < this.board.length; i += 1) {
      if (this.board[i].shipPlacement === true && this.board[i].beenShot === false) {
        unhit.push(this.board[i]);
      }
    }
    if (unhit.length === 0) {
      return true;
    }
    return false;
  }
}

/* module.exports = gameBoard; */

export default GameBoard;
