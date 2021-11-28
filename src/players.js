const Players = ({}) => ({
  currentTurn: true,
  playTurn() {
    if (this.currentTurn === true) {
      this.currentTurn = false;
      return true;
    }
    return false;
  },
});

/* module.exports = players; */

export default Players;
