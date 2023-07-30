import * as vscode from 'vscode';

class MatlabVariable extends vscode.TreeItem {

	constructor(
		public readonly key: string,
		public readonly value: string,
	) {
		super(key, vscode.TreeItemCollapsibleState.None);
		this.description = value;
	}
}

export class WorkBenchProvider implements vscode.TreeDataProvider<MatlabVariable> {

	private _onDidChangeTreeData: vscode.EventEmitter<undefined> = new vscode.EventEmitter<undefined>();
	readonly onDidChangeTreeData: vscode.Event<undefined> = this._onDidChangeTreeData.event;
	private workbenchData: Map<string, string> = new Map<string, string>([['Hello', 'World']]);

	refresh(): void {
		this._onDidChangeTreeData.fire(undefined);
	}

	setWorkbenchData(workbenchData: Map<string, string>): void {
		this.workbenchData = workbenchData;
		this.refresh();
	}

	getTreeItem(element: MatlabVariable): MatlabVariable | Thenable<MatlabVariable> {
		return element;
	}

	getChildren(element?: MatlabVariable | undefined): vscode.ProviderResult<MatlabVariable[]> {
		let variableList: MatlabVariable[] = [];
		for (let [key, value] of this.workbenchData) {
			variableList.push(new MatlabVariable(key, value));
		};
		return variableList;
	}
}

