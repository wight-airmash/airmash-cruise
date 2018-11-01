import Hotkeys from './hotkeys';

export default class Config {
  constructor() {
    const DEFAULT_SETTINGS = {
      hotkeys: new Hotkeys().all(),
    };

    this.userSettings = DEFAULT_SETTINGS;

    this.settingsProvider = () => {
      const parseSettings = settings => {
        const compiledSettings = { ...settings };

        return compiledSettings;
      };

      const onSettingsApplied = settings => {
        this.userSettings = parseSettings(settings);
      };

      const sp = new SettingsProvider(DEFAULT_SETTINGS, onSettingsApplied);
      /* const section = sp.addSection('Cruise Hotkeys');

      section.addButton('Change cruise control hotkey', {
        click() {
          console.log(this);
        },
        css: {
          width: '100%',
          display: 'block',
        },
      });

      section.addButton('Change boosted cruise hotkey', {
        click() {},
      });*/

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
