import * as vscode from 'vscode';
import * as utils from './utils';
import { ScopesNodeManager } from './nodeScopes';

export function activate(context: vscode.ExtensionContext) {
	const rootPath =
		vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
			? vscode.workspace.workspaceFolders[0].uri.fsPath
			: undefined;
	utils.initContext(context);
	const scopesNodeManger = new ScopesNodeManager(rootPath);

	const scope = vscode.commands.registerCommand('scope-to-this.scope', async (_path: vscode.Uri) => {
		if (!_path) {
			vscode.window.showInformationMessage('Use this command from the Explorer context menu.');
			return;
		}
		await utils.clearScope();
		await utils.scopeToThis(_path);
	});

	const clear = vscode.commands.registerCommand('scope-to-this.clear', async () => {
		await utils.clearScope();
	});

	const addScope = vscode.commands.registerCommand('scopes-manager.add', async (_path: vscode.Uri) => {
		scopesNodeManger.addToScopes(_path);
		scopesNodeManger.refresh();
	});

	const removeScope = vscode.commands.registerCommand('scopes-manager.remove', async (label: string) => {
		scopesNodeManger.removeFromScopes(label);
		scopesNodeManger.refresh();
	});

	vscode.window.registerTreeDataProvider('scoopes', scopesNodeManger);

	context.subscriptions.push(scope);
	context.subscriptions.push(clear);
	context.subscriptions.push(addScope);
	context.subscriptions.push(removeScope);
}

// this method is called when your extension is deactivated
export function deactivate() {}
