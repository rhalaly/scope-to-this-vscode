// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as utils from './utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    utils.initContext(context);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let scope = vscode.commands.registerCommand('scope-to-this.scope', (path: vscode.Uri) => {
        // The code you place here will be executed every time your command is executed

        if (!path) {
            vscode.window.showInformationMessage("Use this command from the Explorer context menu.");
            return;
        }

        utils.scopeToThis(path);
    });

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let clear = vscode.commands.registerCommand('scope-to-this.clear', () => {
        // The code you place here will be executed every time your command is executed

        utils.clearScope();
    });

    context.subscriptions.push(scope);
    context.subscriptions.push(clear);
}

// this method is called when your extension is deactivated
export function deactivate() { }
