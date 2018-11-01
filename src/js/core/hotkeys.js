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
      CRUISE: ['5', 'End'],
      BOOST: ['6'],
      UP: ['ArrowUp', 'w'],
      DOWN: ['ArrowDown', 's'],
    }; // cruise control hotkey // cruise control with auto-acceleration hotkey
  }

  all() {
    if (!this.isInit) {
      this.parseHotkeys();
      this.bindKeybindsEvents();

      this.isInit = true;
    }

    return this.keys;
  }

  parseHotkeys() {
    const settings = JSON.parse(localStorage.getItem('settings'));

    if (isExists(settings.keybinds)) {
      if (isExists(settings.keybinds.UP)) {
        this.keys.UP = settings.keybinds.UP.map(convertKey);
      } else {
        this.keys.UP = ['ArrowUp', 'w'];
      }

      if (isExists(settings.keybinds.DOWN)) {
        this.keys.DOWN = settings.keybinds.DOWN.map(convertKey);
      } else {
        this.keys.DOWN = ['ArrowDown', 's'];
      }
    }
  }

  bindKeybindsEvents() {
    const originalCloseKeybinds = Input.closeKeybinds;

    Input.closeKeybinds = () => {
      this.parseHotkeys();

      if (isExists(SWAM)) {
        SWAM.trigger('cruise:keybinds:updated');
      }

      originalCloseKeybinds();
    };
  }
}
