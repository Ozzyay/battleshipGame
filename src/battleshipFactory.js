const battleshipFactory = ({
  name, length, position,
}) => ({
  name,
  length,
  position,
  hitArea: [],
  sunk: false,
  hit() {
    this.hitArea.push('hit');
    if (this.isSunk()) {
      this.sunk = true;
      return `Enemy ${name} has been sunk!`;
    }
    return 'Hit';
  },
  isSunk() {
    if (this.position.length === this.hitArea.length) {
      return true;
    }
    return false;
  },
});

/* module.exports = battleshipFactory; */

export default battleshipFactory;
