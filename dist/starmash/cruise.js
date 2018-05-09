(function () {
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

  const cruise64green =
    'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzNTkuMjEgMzU5LjIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KPG1ldGFkYXRhPgo8cmRmOlJERj4KPGNjOldvcmsgcmRmOmFib3V0PSIiPgo8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KPGRjOnR5cGUgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIvPgo8ZGM6dGl0bGUvPgo8L2NjOldvcms+CjwvcmRmOlJERj4KPC9tZXRhZGF0YT4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxMC4wMSAtMzQzLjEzKSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIuMTE2IC0yLjg1ODgpIiBmaWxsPSIjYzlmZjAwIj4KPHBhdGggZD0ibTM3Ny41IDQzNy4zOGMtNzMuMTc4IDAtMTMyLjUgNTkuMzIyLTEzMi41IDEzMi41IDAgNDAuODM3IDE4LjQ4NCA3Ny4zNTEgNDcuNTMxIDEwMS42NiA4Ljg3NjUtOC44OTQ0IDE3Ljc1MS0xNy43OTEgMjYuNjI1LTI2LjY4OCAxLjk1MjYtMS45NTI2IDAuMzczOTktNi43MTk4LTMuNTMxMi0xMC42MjUtMy45MDUyLTMuOTA1Mi04LjY0MTEtNS40ODM5LTEwLjU5NC0zLjUzMTJsLTEyLjY4OCAxMi42ODhjLTE0LjQ2Ny0xNi43NDgtMjQuMDg4LTM3LjgxNy0yNi42NTYtNjFoMTkuMzEyYzIuNzYxNCAwIDUtNC40NzcyIDUtMTBzLTIuMjM4Ni0xMC01LTEwaC0xOS43NWMxLjU3NTItMjMuOTE0IDEwLjYwNi00NS43OTMgMjQuODEyLTYzLjMxMmwxNC45NjkgMTQuOTY5YzEuOTUyNiAxLjk1MjYgNi42ODg1IDAuMzczOTkgMTAuNTk0LTMuNTMxMiAzLjkwNTItMy45MDUyIDUuNDgzOS04LjY3MjQgMy41MzEyLTEwLjYyNWwtMTUuMTU2LTE1LjE1NmMxNy4zNDgtMTQuOTg1IDM5LjMzMS0yNC43NzMgNjMuNS0yNi45MDZ2MjIuMDYyYzAgMi43NjE0IDQuNDc3MiA1IDEwIDVzMTAtMi4yMzg2IDEwLTV2LTIyLjA2MmMyNC4xOCAyLjEzMDQgNDYuMTQ3IDExLjkxMSA2My41IDI2LjkwNmwtMTUuMTU2IDE1LjE1NmMtMS45NTI2IDEuOTUyNi0wLjM3Mzk5IDYuNzE5OCAzLjUzMTIgMTAuNjI1IDMuOTA1MiAzLjkwNTIgOC42NDExIDUuNDgzOSAxMC41OTQgMy41MzEybDE0Ljk2OS0xNC45NjljMTQuMjAzIDE3LjUyMSAyMy4yNDIgMzkuMzk2IDI0LjgxMiA2My4zMTJoLTE5Ljc1Yy0yLjc2MTQgMC01IDQuNDc3Mi01IDEwczIuMjM4NiAxMCA1IDEwaDE5LjI4MWMtMi41NjMxIDIzLjE4Ni0xMi4xNjUgNDQuMjUtMjYuNjI1IDYxbC0xMi42ODgtMTIuNjg4Yy0xLjk1MjYtMS45NTI2LTYuNjg4NS0wLjM3Mzk5LTEwLjU5NCAzLjUzMTItMy45MDUyIDMuOTA1Mi01LjQ4MzkgOC42NzI0LTMuNTMxMiAxMC42MjUgOC44NzI5IDguOTA4NCAxNy43NjYgMTcuNzk3IDI2LjY1NiAyNi42ODggMjkuMDM3LTI0LjMwNiA0Ny41LTYwLjgyOCA0Ny41LTEwMS42NiAwLTczLjE3OC01OS4zMjItMTMyLjUtMTMyLjUtMTMyLjV6Ii8+CjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KDEuMTY2NyAwIDAgMS4xNjY3IC02MCAtOTUuMzk0KSIgZD0ibTM5MCA1NzIuMzZjMCA4LjI4NDMtNi43MTU3IDE1LTE1IDE1cy0xNS02LjcxNTctMTUtMTUgNi43MTU3LTE1IDE1LTE1IDE1IDYuNzE1NyAxNSAxNXoiLz4KPHBhdGggZD0ibTM0NS43MyA0OTMuNTNjLTQuNjA2OCAyLjA2NjQtNy40ODQ5IDUuNDk4MS02LjU0NjUgNy45MTA4bDIzLjc4NyA2MS4xNjJjLTMuMDc1MiA0LjU4OTYtMy45MzM5IDEwLjU3Ni0xLjc3OTUgMTYuMTE2IDMuNTAzMiA5LjAwNzcgMTMuNjQ1IDEzLjQ3IDIyLjY1MyA5Ljk2NjhzMTMuNDctMTMuNjQ1IDkuOTY2OC0yMi42NTNjLTIuMTU0NC01LjUzOTUtNi44MzI0LTkuMzczLTEyLjItMTAuNjc5bC0yMy43ODctNjEuMTYyYy0xLjAwMDktMi41NzM2LTUuOTg1LTMuMDM3Mi0xMS4xMzItMS4wMzUzLTAuMzIxNyAwLjEyNTExLTAuNjU0MDEgMC4yMzYtMC45NjExMiAwLjM3Mzc5eiIvPgo8cGF0aCBkPSJtMzAzLjUyIDM4Ni44MiAxOC42NzYtNy4xNTU2IDguOTQ0NSAyMy4zNDUgMTQuMDA3LTUuMzY2Ny0yMC4xNjEgNDUuMjA2LTQ1LjIwNi0yMC4xNjEgMTQuMDA3LTUuMzY2Ny04Ljk0NDUtMjMuMzQ1eiIvPgo8L2c+CjwvZz4KPC9zdmc+Cg==';
  const cruiseOnDataURL = `url('data:image/svg+xml;base64,${cruise64green}')`;
  const cruiseOFFDataURL = `url('data:image/svg+xml;base64,${Base64.encode(
  Base64.decode(cruise64green).replace(/#c9ff00/g, '#555555')
)}')`;
  class Cruise {
    constructor() {
      this.isCruiseControl = false;
      this.cruiseControlDirection = 'UP';
      this.isDirectionKeyWasPressed = false;
      this.flightDirection = 'UP';
      this.isBoost = false;
      this.boostInterval = null;
    }
    bindHotkeys({ CRUISE, BOOST, UP, DOWN }) {
      this.HOTKEYS = {
        CRUISE,
        BOOST,
        UP,
        DOWN,
      };
      this.resetDefaultCruise();
      SWAM.on('keydown', e => {
        const isUp = this.HOTKEYS.UP.includes(e.key);
        const isDown = this.HOTKEYS.DOWN.includes(e.key);
        if (isUp || isDown) {
          if (this.isCruiseControl && !this.isDirectionKeyWasPressed) {
            this.isCruiseControl = false;
            this.stopBoost();
            this.stop();
          }
          this.isDirectionKeyWasPressed = true;
          this.flightDirection = isUp ? 'UP' : 'DOWN';
        } else if (
          (this.HOTKEYS.CRUISE.includes(e.key) || this.HOTKEYS.BOOST.includes(e.key)) &&
          !isChatOpen()
        ) {
          if (this.isCruiseControl) {
            this.isCruiseControl = false;
            this.stopBoost();
            this.stop();
          } else {
            this.isCruiseControl = true;
            this.start(this.flightDirection);
            if (game.myType === SHIPS.PREDATOR && this.HOTKEYS.BOOST.includes(e.key)) {
              this.startBoost();
            }
          }
        }
      });
      SWAM.on('keyup', e => {
        if (this.HOTKEYS.UP.includes(e.key) || this.HOTKEYS.DOWN.includes(e.key)) {
          this.isDirectionKeyWasPressed = false;
          if (this.isCruiseControl) {
            this.isCruiseControl = true;
            setTimeout(() => {
              this.start(this.flightDirection);
            }, 20);
          }
        }
      });
    }
    start(direction) {
      this.cruiseControlDirection = direction;
      Network.sendKey(this.cruiseControlDirection, true);
      $('#CruiseControl')
        .css({
          borderColor: '#c9ff00',
          'background-size': '44px 44px',
          backgroundImage: cruiseOnDataURL,
        })
        .attr('state', 'ON');
    }
    stop() {
      Network.sendKey(this.cruiseControlDirection, false);
      $('#CruiseControl')
        .css({
          borderColor: '#555555',
          'background-size': '35px 35px',
          backgroundImage: cruiseOFFDataURL,
        })
        .attr('state', 'OFF');
    }
    startBoost() {
      this.boostInterval = setInterval(() => {
        this.isBoost = !this.isBoost;
        Network.sendKey('SPECIAL', this.isBoost);
        setTimeout(() => {
          Network.sendKey('SPECIAL', false);
        }, 850);
      }, 1000);
    }
    stopBoost() {
      clearInterval(this.boostInterval);
      this.isBoost = false;
      Network.sendKey('SPECIAL', false);
    }
    clear() {
      this.stop();
      clearInterval(this.boostInterval);
    }
    resetDefaultCruise() {
      if (
        this.HOTKEYS.BOOST.includes('5') ||
        this.HOTKEYS.BOOST.includes('End') ||
        this.HOTKEYS.CRUISE.includes('5') ||
        this.HOTKEYS.CRUISE.includes('End')
      ) {
        SWAM.CruiseMode.on = () => {};
        SWAM.CruiseMode.off = () => {};
      }
    }
  }

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

  class Config {
    constructor() {
      const DEFAULT_SETTINGS = {
        hotkeys: new Hotkeys().all(),
      };
      this.userSettings = DEFAULT_SETTINGS;
      console.log(this.userSettings);
      this.settingsProvider = () => {
        const parseSettings = settings => {
          const compiledSettings = { ...settings };
          return compiledSettings;
        };
        const onSettingsApplied = settings => {
          this.userSettings = parseSettings(settings);
        };
        const sp = new SettingsProvider(DEFAULT_SETTINGS, onSettingsApplied);
        return sp;
      };
    }
    hotkeys() {
      return this.userSettings.hotkeys;
    }
    provider() {
      return this.settingsProvider();
    }
  }

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
    version: '1.0.0',
  });

}());
