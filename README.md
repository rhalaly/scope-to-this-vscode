# Scope to This 🎯

Adds "Scope to This" option to the Explorer context menu, like in Visual Studio. Lets you focus on the things that matter.

![screenshot](https://raw.githubusercontent.com/rhalaly/scope-to-this-vscode/master/resources/demo.gif)

## Features
* Adds "Scope to This" option to the Explorer context menu to scope the selected directory.
* Adds "Clear scope" option to the Explorer context menu (also available as a command `scope-to-this.clear`) To return to the root of the project.

## Known Issues 🐛

To scope we use the `file.exclude` option in the `settings.json` configuration file. This file may be included in the Git repository. So be careful when you commit...

## Acknowledgement
This project inspired by these projects:
* [Explorer Exclude](https://github.com/redvanworkshop/explorer-exclude-vscode-extension)