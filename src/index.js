/* eslint-disable no-await-in-loop */
/* eslint-disable no-new */
/* eslint-disable radix */
/* eslint-disable prefer-const */
import GameBoard from './gameboardFactory';
import battleshipFactory from './battleshipFactory';
import './images/background.jpg';
import './style.css';
import npcAi from './AI';

const playerBoard = new GameBoard();
const computerBoard = new GameBoard();
const ai = new npcAi();
const cruiserSelector = document.querySelector('.cruiser');
const destroyerSelector = document.querySelector('.destroyer');
const carrierSelector = document.querySelector('.carrier');
const battleshipSelector = document.querySelector('.battleship');
const submarineSelector = document.querySelector('.submarine');
const playerContainer = document.querySelector('#playerGrid');
const computerContainer = document.querySelector('#computerGrid');
const toggleswitch = document.querySelector('input[name=checkbox]');
let currentOrientation = 'horizontal';
let playerCruiser = {};
let playerDestroyer = {};
let playerSubmarine = {};
let playerCarrier = {};
let playerBattleship = {};
let theFactory = [];
let selecting = false;
let cruiserSelected = false;
let destroyerSelected = false;
let carrierSelected = false;
let battleshipSelected = false;
let submarineSelected = false;
let gameStarted = false;

const refresh = function () {
  playerCruiser = {};
  playerDestroyer = {};
  playerSubmarine = {};
  playerCarrier = {};
  playerBattleship = {};
  theFactory = [];
  selecting = false;
  cruiserSelected = false;
  destroyerSelected = false;
  carrierSelected = false;
  battleshipSelected = false;
  submarineSelected = false;
  gameStarted = false;
  while (playerContainer.firstChild) {
    playerContainer.removeChild(playerContainer.firstChild);
  }
  while (computerContainer.firstChild) {
    computerContainer.removeChild(computerContainer.firstChild);
  }
  for (let i = 0; i < playerBoard.board.length; i += 1) {
    const div = document.createElement('div');
    div.setAttribute('class', 'boardsquare');
    div.setAttribute('id', `${i}`);
    playerContainer.appendChild(div);
  }
  for (let i = 0; i < computerBoard.board.length; i += 1) {
    const div = document.createElement('div');
    div.setAttribute('class', 'boardsquare');
    div.setAttribute('id', `npc${i}`);
    computerContainer.appendChild(div);
  }
};
window.addEventListener('load', () => {
  for (let i = 0; i < playerBoard.board.length; i += 1) {
    const div = document.createElement('div');
    div.setAttribute('class', 'boardsquare');
    div.setAttribute('id', `${i}`);
    playerContainer.appendChild(div);
  }
  for (let i = 0; i < computerBoard.board.length; i += 1) {
    const div = document.createElement('div');
    div.setAttribute('class', 'boardsquare');
    div.setAttribute('id', `npc${i}`);
    computerContainer.appendChild(div);
  }
}, { once: true });

const popUpText = async function (arg) {
  let div = document.getElementById('PopupText');
  div.innerHTML = arg;
  div.style.fontSize = '72px';
  div.style.zIndex = '1';
  await setTimeout(() => { div.style.fontSize = '0'; }, 2000);
  await setTimeout(() => { div.innerHTML = ''; div.style.zIndex = '-100'; }, 2600);
};
const computerBoardGenerate = function () {
  let preset = ai.selectPreset();
  let carrierConfig = preset[0];
  let battleshipConfig = preset[1];
  let cruiserConfig = preset[2];
  let submarineConfig = preset[3];
  let destroyerConfig = preset[4];
  let npcCarrier = battleshipFactory({ name: 'carrier', length: 5, position: computerBoard.checkPlacement(carrierConfig[0], carrierConfig[1], carrierConfig[2]) });
  let npcBattleship = battleshipFactory({ name: 'battleship', length: 4, position: computerBoard.checkPlacement(battleshipConfig[0], battleshipConfig[1], battleshipConfig[2]) });
  let npcCruiser = battleshipFactory({ name: 'cruiser', length: 3, position: computerBoard.checkPlacement(cruiserConfig[0], cruiserConfig[1], cruiserConfig[2]) });
  let npcSubmarine = battleshipFactory({ name: 'submarine', length: 3, position: computerBoard.checkPlacement(submarineConfig[0], submarineConfig[1], submarineConfig[2]) });
  let npcDestroyer = battleshipFactory({ name: 'destroyer', length: 2, position: computerBoard.checkPlacement(destroyerConfig[0], destroyerConfig[1], destroyerConfig[2]) });
  let carrierArray = npcCarrier.position;
  let battleshipArray = npcBattleship.position;
  let cruiserArray = npcCruiser.position;
  let submarineArray = npcSubmarine.position;
  let destroyerArray = npcDestroyer.position;
  computerBoard.confirmPlacement(carrierArray, npcCarrier);
  computerBoard.confirmPlacement(battleshipArray, npcBattleship);
  computerBoard.confirmPlacement(cruiserArray, npcCruiser);
  computerBoard.confirmPlacement(submarineArray, npcSubmarine);
  computerBoard.confirmPlacement(destroyerArray, npcDestroyer);
};
computerBoardGenerate();

const startGame = async function () {
  popUpText('GAME STARTED!');
  popUpText('TURNS ARE SYNCED!');
  while (gameStarted = true) {
    await playerTurn();
    let compshot = ai.randomShot();
    let compshotcheck = playerBoard.receiveAttack(compshot);
    if (compshotcheck !== false) {
      document.getElementById(`${compshot}`).classList.add('calculating');
      setTimeout(() => { document.getElementById(`${compshot}`).classList.add('successfulHit'); }, 1000);
      setTimeout(() => { document.getElementById(`${compshot}`).classList.remove('calculating'); }, 1000);
    } else {
      document.getElementById(`${compshot}`).classList.add('calculating');
      setTimeout(() => { document.getElementById(`${compshot}`).classList.add('missedHit'); }, 1000);
      setTimeout(() => { document.getElementById(`${compshot}`).classList.remove('calculating'); }, 1000);
    }
    if (playerBoard.checkBoard() === true) {
      gameStarted = false;
      await popUpText('YOU LOSE!');
    } if (computerBoard.checkBoard() === true) {
      gameStarted = false;
      await popUpText('YOU WIN!');
    }
  }
};

const playerTurn = async function () {
  let conversionRegex = /\D+/;
  let x = new Promise((resolve) => {
    computerContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('missedHit') === false && e.target.classList.contains('successfulHit') === false && e.target.classList.contains('boardsquare') === true) {
        resolve(e.target.id);
      }
    });
  });
  let m = await x;
  m = m.replace(conversionRegex, '');
  let mxy = computerBoard.receiveAttack(m);
  if (mxy !== false) {
    document.getElementById(`npc${m}`).classList.add('calculating');
    setTimeout(() => { document.getElementById(`npc${m}`).classList.add('successfulHit'); }, 1000);
    setTimeout(() => { document.getElementById(`npc${m}`).classList.remove('calculating'); }, 1000);
    return popUpText(mxy);
  }
  document.getElementById(`npc${m}`).classList.add('calculating');
  setTimeout(() => { document.getElementById(`npc${m}`).classList.add('missedHit'); }, 1000);
  return setTimeout(() => { document.getElementById(`npc${m}`).classList.remove('calculating'); }, 1000);
};

toggleswitch.addEventListener('change', () => {
  if (currentOrientation === 'horizontal') {
    currentOrientation = 'vertical';
  } else {
    currentOrientation = 'horizontal';
  }
});

cruiserSelector.addEventListener('dblclick', () => {
  if (selecting === false && cruiserSelected === false) {
    selecting = true;
    cruiserSelector.style.border = '1px solid yellow';
    playerContainer.addEventListener('mouseover', (e) => {
      let x0 = playerBoard.checkPlacement((parseInt(e.target.id)), currentOrientation, 3);
      let p1 = document.getElementById(`${x0[0]}`);
      let p2 = document.getElementById(`${x0[1]}`);
      let p3 = document.getElementById(`${x0[2]}`);
      if (p1 !== null && p2 !== null && p3 !== null && p1.classList.contains('chosen') === false && p2.classList.contains('chosen') === false && p3.classList.contains('chosen') === false && cruiserSelected === false) {
        p1.classList.add('choosing');
        p2.classList.add('choosing');
        p3.classList.add('choosing');
        playerContainer.addEventListener('mouseout', () => {
          for (let i = 0; i < 100; i += 1) {
            document.getElementById(`${i}`).classList.remove('choosing');
          }
        });
      }
      playerContainer.addEventListener('click', (ev) => {
        if (selecting === true && cruiserSelected === false) {
          let m = parseInt(ev.target.id);
          if (playerBoard.checkPlacement(m, currentOrientation, 3) !== false) {
            let b = playerBoard.checkPlacement(m, currentOrientation, 3);
            playerCruiser = battleshipFactory({ name: 'cruiser', length: 3, position: b });
            let z = playerBoard.confirmPlacement(b, playerCruiser);
            if (z === true) {
              for (let i = 0; i < b.length; i += 1) {
                document.getElementById(`${b[i]}`).classList.add('chosen');
              }
              selecting = false;
              cruiserSelector.style.border = '1px solid red';
              cruiserSelected = true;
              theFactory.push(playerCruiser);
              if (theFactory.length === 5) {
                gameStarted = true;
                startGame();
              }
            }
          }
        }
      });
    });
  }
});

submarineSelector.addEventListener('dblclick', () => {
  if (selecting === false && submarineSelected === false) {
    selecting = true;
    submarineSelector.style.border = '1px solid yellow';
    playerContainer.addEventListener('mouseover', (e) => {
      let x0 = playerBoard.checkPlacement((parseInt(e.target.id)), currentOrientation, 3);
      let x1 = x0[0];
      let x2 = x0[1];
      let x3 = x0[2];
      let p1 = document.getElementById(`${x1}`);
      let p2 = document.getElementById(`${x2}`);
      let p3 = document.getElementById(`${x3}`);
      if (p1 !== null && p2 !== null && p3 !== null && p1.classList.contains('chosen') === false && p2.classList.contains('chosen') === false && p3.classList.contains('chosen') === false && submarineSelected === false) {
        p1.classList.add('choosing');
        p2.classList.add('choosing');
        p3.classList.add('choosing');
        playerContainer.addEventListener('mouseout', () => {
          for (let i = 0; i < 100; i += 1) {
            document.getElementById(`${i}`).classList.remove('choosing');
          }
        });
      }
      playerContainer.addEventListener('click', (ev) => {
        if (selecting === true && submarineSelected === false) {
          let m = parseInt(ev.target.id);
          if (playerBoard.checkPlacement(m, currentOrientation, 3) !== false) {
            let b = playerBoard.checkPlacement(m, currentOrientation, 3);
            playerSubmarine = battleshipFactory({ name: 'submarine', length: 3, position: b });
            let z = playerBoard.confirmPlacement(b, playerSubmarine);
            if (z === true) {
              for (let i = 0; i < b.length; i += 1) {
                document.getElementById(`${b[i]}`).classList.add('chosen');
              }
              selecting = false;
              submarineSelector.style.border = '1px solid red';
              submarineSelected = true;
              theFactory.push(playerSubmarine);
              if (theFactory.length === 5) {
                gameStarted = true;
                startGame();
              }
            }
          }
        }
      });
    });
  }
});

destroyerSelector.addEventListener('dblclick', () => {
  if (selecting === false && destroyerSelected === false) {
    selecting = true;
    destroyerSelector.style.border = '1px solid yellow';
    playerContainer.addEventListener('mouseover', (e) => {
      let x0 = playerBoard.checkPlacement((parseInt(e.target.id)), currentOrientation, 2);
      let x1 = x0[0];
      let x2 = x0[1];
      let p1 = document.getElementById(`${x1}`);
      let p2 = document.getElementById(`${x2}`);
      if (p1 !== null && p2 !== null && p1.classList.contains('chosen') === false && p2.classList.contains('chosen') === false && destroyerSelected === false) {
        p1.classList.add('choosing');
        p2.classList.add('choosing');
        playerContainer.addEventListener('mouseout', () => {
          for (let i = 0; i < 100; i += 1) {
            document.getElementById(`${i}`).classList.remove('choosing');
          }
        });
      }
      playerContainer.addEventListener('click', (ev) => {
        if (selecting === true && destroyerSelected === false) {
          let m = parseInt(ev.target.id);
          if (playerBoard.checkPlacement(m, currentOrientation, 2) !== false) {
            let b = playerBoard.checkPlacement(m, currentOrientation, 2);
            playerDestroyer = battleshipFactory({ name: 'destroyer', length: 2, position: b });
            let z = playerBoard.confirmPlacement(b, playerDestroyer);
            if (z === true) {
              for (let i = 0; i < b.length; i += 1) {
                document.getElementById(`${b[i]}`).classList.add('chosen');
              }
              selecting = false;
              destroyerSelector.style.border = '1px solid red';
              destroyerSelected = true;
              theFactory.push(playerDestroyer);
              if (theFactory.length === 5) {
                gameStarted = true;
                startGame();
              }
            }
          }
        }
      });
    });
  }
});

battleshipSelector.addEventListener('dblclick', () => {
  if (selecting === false && battleshipSelected === false) {
    selecting = true;
    battleshipSelector.style.border = '1px solid yellow';
    playerContainer.addEventListener('mouseover', (e) => {
      let x0 = playerBoard.checkPlacement((parseInt(e.target.id)), currentOrientation, 4);
      let x1 = x0[0];
      let x2 = x0[1];
      let x3 = x0[2];
      let x4 = x0[3];
      let p1 = document.getElementById(`${x1}`);
      let p2 = document.getElementById(`${x2}`);
      let p3 = document.getElementById(`${x3}`);
      let p4 = document.getElementById(`${x4}`);
      if (p1 !== null && p2 !== null && p3 !== null && p4 !== null && p1.classList.contains('chosen') === false && p2.classList.contains('chosen') === false && p3.classList.contains('chosen') === false && p4.classList.contains('chosen') === false && battleshipSelected === false) {
        p1.classList.add('choosing');
        p2.classList.add('choosing');
        p3.classList.add('choosing');
        p4.classList.add('choosing');
        playerContainer.addEventListener('mouseout', () => {
          for (let i = 0; i < 100; i += 1) {
            document.getElementById(`${i}`).classList.remove('choosing');
          }
        });
      }
      playerContainer.addEventListener('click', (ev) => {
        if (selecting === true && battleshipSelected === false) {
          let m = parseInt(ev.target.id);
          if (playerBoard.checkPlacement(m, currentOrientation, 4) !== false) {
            let b = playerBoard.checkPlacement(m, currentOrientation, 4);
            playerBattleship = battleshipFactory({ name: 'battleship', length: 4, position: b });
            let z = playerBoard.confirmPlacement(b, playerBattleship);
            if (z === true) {
              for (let i = 0; i < b.length; i += 1) {
                document.getElementById(`${b[i]}`).classList.add('chosen');
              }
              selecting = false;
              battleshipSelector.style.border = '1px solid red';
              battleshipSelected = true;
              theFactory.push(playerBattleship);
              if (theFactory.length === 5) {
                gameStarted = true;
                startGame();
              }
            }
          }
        }
      });
    });
  }
});

carrierSelector.addEventListener('dblclick', () => {
  if (selecting === false && carrierSelected === false) {
    selecting = true;
    carrierSelector.style.border = '1px solid yellow';
    playerContainer.addEventListener('mouseover', (e) => {
      let x0 = playerBoard.checkPlacement((parseInt(e.target.id)), currentOrientation, 5);
      let x1 = x0[0];
      let x2 = x0[1];
      let x3 = x0[2];
      let x4 = x0[3];
      let x5 = x0[4];
      let p1 = document.getElementById(`${x1}`);
      let p2 = document.getElementById(`${x2}`);
      let p3 = document.getElementById(`${x3}`);
      let p4 = document.getElementById(`${x4}`);
      let p5 = document.getElementById(`${x5}`);
      if (p1 !== null && p2 !== null && p3 !== null && p4 !== null && p5 !== null && p1.classList.contains('chosen') === false && p2.classList.contains('chosen') === false && p3.classList.contains('chosen') === false && p4.classList.contains('chosen') === false && p5.classList.contains('chosen') === false && carrierSelected === false) {
        p1.classList.add('choosing');
        p2.classList.add('choosing');
        p3.classList.add('choosing');
        p4.classList.add('choosing');
        p5.classList.add('choosing');
        playerContainer.addEventListener('mouseout', () => {
          for (let i = 0; i < 100; i += 1) {
            document.getElementById(`${i}`).classList.remove('choosing');
          }
        });
      }
      playerContainer.addEventListener('click', (ev) => {
        if (selecting === true && carrierSelected === false) {
          let m = parseInt(ev.target.id);
          if (playerBoard.checkPlacement(m, currentOrientation, 5) !== false) {
            let b = playerBoard.checkPlacement(m, currentOrientation, 5);
            playerCarrier = battleshipFactory({ name: 'carrier', length: 5, position: b });
            let z = playerBoard.confirmPlacement(b, playerCarrier);
            if (z === true) {
              for (let i = 0; i < b.length; i += 1) {
                document.getElementById(`${b[i]}`).classList.add('chosen');
              }
              selecting = false;
              carrierSelector.style.border = '1px solid red';
              carrierSelected = true;
              theFactory.push(playerCarrier);
              if (theFactory.length === 5) {
                gameStarted = true;
                startGame();
              }
            }
          }
        }
      });
    });
  }
});
