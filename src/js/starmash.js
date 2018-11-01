import Cruise from './core/cruise';
import Config from './core/config';

const cruise = new Cruise();

SWAM.on('gameRunning', () => {
  const config = new Config();
  cruise.loadHotkeys(config.hotkeys());
  cruise.bindHotkeys();

  SWAM.on('cruise:keybinds:updated', () => {
    cruise.loadHotkeys(config.hotkeys());
  });
});

SWAM.on('gameWipe', () => {
  cruise.clear();
});

SWAM.registerExtension({
  name: 'Improved Cruise Control',
  id: 'wight.cruise',
  description: 'Moving forward or backward in cruise mode and auto acceleration',
  author: 'wight',
  version: '1.1.0',
});
