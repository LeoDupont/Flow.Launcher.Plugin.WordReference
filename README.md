# WordReference plugin for Flow Launcher for Windows

This plugin allows you to get translations from [WordReference](https://www.wordreference.com/) with [Flow Launcher](https://github.com/Flow-Launcher/Flow.Launcher) for Windows.

Since WordReference doesn't provide an API, I'm using [fega/wordreference-api](https://github.com/fega/wordreference-api) to take the scraping in charge (thank you for this cool module by the way).

The available languages are:
- Spanish (`es`)
- English (`en`)
- Italian (`it`)
- French (`fr`)

# Usage

This plugin takes the following form of input:
```
<from><to> <phrase>
```

Where `<from>` and `<to>` are the two languages you want to translate from and to, respectively, and `<phrase>` is the phrase you want to translate.

For example, to translate "c'est la vie" from French to English, you would type:
```
fren c'est la vie
```

![usage screenshot](https://raw.githubusercontent.com/LeoDupont/Flow.Launcher.Plugin.WordReference/main/.readme-images/usage.png)

You can then read the results, or select one of them to open the full WordReference result page in your browser.

# Installation

## 1. Install Node.js

This plugin is written in JavaScript, so you need to install Node.js to use it with Flow Launcher.

Just go to https://nodejs.org/ and download the LTS ("Long Term Support") version of Node.js.

## 2. Install the plugin

You can find this plugin in Flow's Plugin Store (in the app's settings), or by directly running this command in Flow Launcher:
```
pm install WordReference
```
