# Scope to This 🎯

Adds "Scope to This" option to the Explorer context menu, like in Visual Studio. Lets you focus on the things that matter.

<img src="https://raw.githubusercontent.com/rhalaly/scope-to-this-vscode/master/resources/demo.gif" width="400">

## Features ✨
* Adds "Scope to This" option to the Explorer context menu to scope the selected directory.
* Adds "Clear scope" option to the Folders view as a shortcut icon (also available as a command `scope-to-this.clear`) to clear the filter and return to the project's root folder.  
![clear-shortcut](https://raw.githubusercontent.com/rhalaly/scope-to-this-vscode/master/resources/clear-shortcut.png)

## Known Issues 🐛

* To scope we use the `file.exclude` option in the `settings.json` configuration file. This file may be included in the Git repository. So be careful when you commit...

* Folders and files that have the same prefix as the selected folder name may still appear. For example, if you want to scope to the `.vscode` folder, folders and files like `.vs` and `.vscodeignore` will still be visible. 

## Acknowledgement 🙏
This project inspired by these projects:
* [Explorer Exclude](https://github.com/redvanworkshop/explorer-exclude-vscode-extension)
