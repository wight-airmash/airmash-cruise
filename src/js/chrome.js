import Hotkeys from './core/hotkeys';
import isChatOpen from './helpers/chat';
import { SHIPS } from './core/constants';

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
