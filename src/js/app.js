const HOTKEYS = {
  CRUISE: '6', // cruise control hotkey
  BOOST: '7', // cruise control with auto-acceleration hotkey
  UP: ['ArrowUp', 'w'],
  DOWN: ['ArrowDown', 's'],
};

const SHIPS = {
  PREDATOR: 1,
  MOHAWK: 3,
};

const isExists = v => typeof v !== 'undefined';

const setupHotkeys = () => {
  if (isExists(config.settings.keybinds.UP)) {
    HOTKEYS.UP = config.settings.keybinds.UP.map(key => {
      return key === 'UP' ? 'ArrowUp' : key.toLowerCase();
    });
  }

  if (isExists(config.settings.keybinds.DOWN)) {
    HOTKEYS.DOWN = config.settings.keybinds.DOWN.map(key => {
      return key === 'DOWN' ? 'ArrowDown' : key.toLowerCase();
    });
  }
};

const isChatOpen = () => {
  const chatInput = document.querySelector('#chatinput');

  return (
    chatInput !== null && !(chatInput.style.display === 'none' || chatInput.style.display === '')
  );
};

const cruiseStart = direction => {
  cruiseControlDirection = direction;
  Network.sendKey(cruiseControlDirection, true);
};

const cruiseStop = () => {
  Network.sendKey(cruiseControlDirection, false);
};

const startBoost = () => {
  boostInterval = setInterval(() => {
    isBoost = !isBoost;
    Network.sendKey('SPECIAL', isBoost);

    setTimeout(() => {
      Network.sendKey('SPECIAL', false);
    }, 850);
  }, 1000);
};

const stopBoost = () => {
  clearInterval(boostInterval);

  isBoost = false;
  Network.sendKey('SPECIAL', false);
};

let isCruiseControl = false;
let cruiseControlDirection = 'UP';
let isDirectionKeyWasPressed = false;
let flightDirection = 'UP';
let isBoost = false;
let boostInterval = null;

setupHotkeys();

document.addEventListener('keydown', e => {
  const isUp = HOTKEYS.UP.includes(e.key);
  const isDown = HOTKEYS.DOWN.includes(e.key);

  if (isUp || isDown) {
    if (isCruiseControl && !isDirectionKeyWasPressed) {
      isCruiseControl = false;

      stopBoost();
      cruiseStop();
    }

    isDirectionKeyWasPressed = true;
    flightDirection = isUp ? 'UP' : 'DOWN';
  } else if ((e.key === HOTKEYS.CRUISE || e.key === HOTKEYS.BOOST) && !isChatOpen()) {
    if (isCruiseControl) {
      isCruiseControl = false;

      stopBoost();
      cruiseStop();
    } else {
      isCruiseControl = true;

      cruiseStart(flightDirection);

      if (game.myType === SHIPS.PREDATOR && e.key === HOTKEYS.BOOST) {
        startBoost();
      }
    }
  }
});

document.addEventListener('keyup', e => {
  if (HOTKEYS.UP.includes(e.key) || HOTKEYS.DOWN.includes(e.key)) {
    isDirectionKeyWasPressed = false;

    if (isCruiseControl) {
      isCruiseControl = true;

      setTimeout(() => {
        cruiseStart(flightDirection);
      }, 20);
    }
  }
});
