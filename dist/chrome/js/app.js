(function () {
  const isExists = v => typeof v !== 'undefined';

  const firstCap = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
  const convertKey = key => {
    const arrows = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
    let resultKey = '';
    if (arrows.includes(key)) {
      resultKey = `Arrow${firstCap(key)}`;
    } else if (key.length === 1) {
      resultKey = key.toLowerCase();
    } else {
      resultKey = key;
    }
    return resultKey;
  };
  class Hotkeys {
    constructor() {
      this.isInit = false;
      this.keys = {
        CRUISE: ['5', 'End'],
        BOOST: ['6'],
        UP: ['ArrowUp', 'w'],
        DOWN: ['ArrowDown', 's'],
      };
    }
    all() {
      if (!this.isInit) {
        this.setupHotkeys();
      }
      return this.keys;
    }
    setupHotkeys() {
      if (isExists(config.settings.keybinds)) {
        if (isExists(config.settings.keybinds.UP)) {
          this.keys.UP = config.settings.keybinds.UP.map(convertKey);
        }
        if (isExists(config.settings.keybinds.DOWN)) {
          this.keys.DOWN = config.settings.keybinds.DOWN.map(convertKey);
        }
      }
    }
  }

  const isChatOpen = () => {
    const chatInput = document.querySelector('#chatinput');
    return (
      chatInput !== null && !(chatInput.style.display === 'none' || chatInput.style.display === '')
    );
  };

  const SHIPS = {
    PREDATOR: 1,
    MOHAWK: 3,
  };

  const HOTKEYS = new Hotkeys().all();
  let isCruiseControl = false;
  let cruiseControlDirection = 'UP';
  let isDirectionKeyWasPressed = false;
  let flightDirection = 'UP';
  let isBoost = false;
  let boostInterval = null;
  let boostStopTimeout = null;
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
      boostStopTimeout = setTimeout(() => {
        Network.sendKey('SPECIAL', false);
      }, 850);
    }, 1000);
  };
  const stopBoost = () => {
    clearTimeout(boostStopTimeout);
    clearInterval(boostInterval);
    isBoost = false;
    Network.sendKey('SPECIAL', false);
  };
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
    } else if ((HOTKEYS.CRUISE.includes(e.key) || HOTKEYS.BOOST.includes(e.key)) && !isChatOpen()) {
      if (isCruiseControl) {
        isCruiseControl = false;
        stopBoost();
        cruiseStop();
      } else {
        isCruiseControl = true;
        cruiseStart(flightDirection);
        if (game.myType === SHIPS.PREDATOR && HOTKEYS.BOOST.includes(e.key)) {
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

}());
