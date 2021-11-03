import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class ScopesNodeManager implements vscode.TreeDataProvider<Scope> {
	private _onDidChangeTreeData: vscode.EventEmitter<Scope | undefined | void> = new vscode.EventEmitter<Scope | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<Scope | undefined | void> = this._onDidChangeTreeData.event;

	constructor(private workspaceRoot: string | undefined) {}

	refresh(): void {
		this._onDidChangeTreeData.fire(undefined);
	}
	getTreeItem(element: Scope): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}
	getChildren(element?: Scope): vscode.ProviderResult<Scope[]> {
		if (!this.workspaceRoot) {
			return Promise.resolve([]);
		}
		if (element) {
			return element.children;
		} else {
			const scopesJsonPath = path.join(this.workspaceRoot, '.vscode/scopes.json');
			if (this.pathExists(scopesJsonPath)) {
				return Promise.resolve(this.getScopesInJson(scopesJsonPath));
			} else {
				fs.writeFile(scopesJsonPath, '[]', (e) => {
					throw e;
				});
				return Promise.resolve([]);
			}
		}
	}
	getScopesInJson(scopesJsonPath: any): any {
		return new Promise((resolve, reject) => {
			fs.readFile(scopesJsonPath, (err, scopes) => {
				if (err) {
					reject(err);
				}
				resolve(JSON.parse(scopes.toString()));
			});
		});
	}
	addToScopes(_path: vscode.Uri) {
		if (!this.workspaceRoot) {
			return;
		}
		const scopesJsonPath = path.join(this.workspaceRoot, '.vscode/scopes.json');
		const label = path.basename(_path.path);

		fs.readFile(scopesJsonPath, (err, data) => {
			if (err) {
				throw err;
			}
			const scopes: Scope[] = JSON.parse(data.toString());
			if (!scopes.find((s) => s.label === label)) {
				scopes.push(
					new Scope(label, vscode.TreeItemCollapsibleState.Collapsed, undefined, [
						new Scope('Scope To', vscode.TreeItemCollapsibleState.None, {
							command: 'scope-to-this.scope',
							title: 'Scope to This',
							arguments: [_path],
						}),
						new Scope('Remove', vscode.TreeItemCollapsibleState.None, {
							command: 'scopes-manager.remove',
							title: 'Remove From Scopes',
							arguments: [label],
						}),
					])
				);
			}
			fs.writeFile(scopesJsonPath, JSON.stringify(scopes), (e) => {
				throw e;
			});
		});
	}
	removeFromScopes(label: string) {
		if (!this.workspaceRoot) {
			return;
		}
		const scopesJsonPath = path.join(this.workspaceRoot, '.vscode/scopes.json');

		fs.readFile(scopesJsonPath, (err, data) => {
			if (err) {
				throw err;
			}
			let scopes: Scope[] = JSON.parse(data.toString());
			scopes = scopes.filter((s) => s.label !== label);

			fs.writeFile(scopesJsonPath, JSON.stringify(scopes), (e) => {
				throw e;
			});
		});
	}
	private pathExists(p: string): boolean {
		try {
			fs.accessSync(p);
		} catch (err) {
			return false;
		}

		return true;
	}
}

export class Scope extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command,
		public children?: Scope[]
	) {
		super(label, collapsibleState);
	}
}
