# Airma.sh Improved Cruise Control

This extension adds a cruise control function with optional auto acceleration mode (for predators).

## [Starmash Mod](https://github.com/Molesmalo/StarWarsMod4AirMash) extension

The basic cruise control function of the mod is improved:

* forward and backward moving;
* moving with auto acceleration.

### How to install

Add an extension file:

```
https://raw.githubusercontent.com/wight-airmash/airmash-cruise/master/dist/starmash/cruise.js
```

### How to use

Press 5 to turn on the cruise control or press 6 to turn on the cruise control with auto-acceleration.
Press again 5 or 6, or direction keys to turn off cruise control.

## Google Chrome extension

This extension for Google Chrome adds a cruise control function with optional auto-acceleration mode (for predators).

### How to install

1.  Download and unzip this project.
2.  Open your Chrome Extensions tab (chrome://extensions).
3.  Turn on "Developer mode" (this will allow you to install the extension from the source code).
4.  Press "Load Unpacked" and choose "src" directory.

### How to use

Press 5 to turn on the cruise control or press 6 to turn on the cruise control with auto-acceleration.
Press again 5 or 6, or direction keys to turn off cruise control.

## How to change hotkeys

At the moment, this can only be done by editing the source code. Change hotkeys in file `src/js/core/hotkeys.js` and rebuild extensions:

```
npm run build
```
