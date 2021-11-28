class npcAi {
  constructor() {
    this.suitableShotArray = [];
    this.refreshArray();
    this.preset1 = [[70, 'horizontal', 5], [99, 'vertical', 4], [93, 'horizontal', 3], [23, 'horizontal', 3], [57, 'vertical', 2]];
    this.preset2 = [[52, 'horizontal', 5], [88, 'vertical', 4], [36, 'horizontal', 3], [31, 'vertical', 3], [92, 'vertical', 2]];
    this.preset3 = [[68, 'vertical', 5], [71, 'horizontal', 4], [93, 'horizontal', 3], [65, 'vertical', 3], [11, 'horizontal', 2]];
  }

  selectPreset() {
    const x = this.constructor.randomInt(1, 3);
    if (x === 1) {
      return this.preset1;
    } if (x === 2) {
      return this.preset2;
    }

    return this.preset3;
  }

  refreshArray() {
    for (let i = 0; i < 100; i++) {
      this.suitableShotArray.push(i);
    }
  }

  randomShot() {
    const shot = this.constructor.randomInt(0, this.suitableShotArray.length);
    const x = this.suitableShotArray[shot];
    this.suitableShotArray.splice(shot, 1);
    return x;
  }

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default npcAi;
