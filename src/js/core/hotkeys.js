import { isExists } from '../helpers/tools';

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
export default class Hotkeys {
  constructor() {
    this.isInit = false;
    this.keys = {
      CRUISE: ['5', 'End'], // cruise control hotkey
      BOOST: ['6'], // cruise control with auto-acceleration hotkey
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
