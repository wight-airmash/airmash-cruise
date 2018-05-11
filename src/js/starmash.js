import Cruise from './core/cruise';
import Config from './core/config';

const cruise = new Cruise();

SWAM.on('gameRunning', () => {
  const config = new Config();
  cruise.bindHotkeys(config.hotkeys());
});

SWAM.on('gameWipe', () => {
  cruise.clear();
});

SWAM.registerExtension({
  name: 'Improved Cruise Control',
  id: 'wight.cruise',
  description: 'Moving forward or backward in cruise mode and auto acceleration',
  author: 'wight',
  version: '1.0.3',
});
