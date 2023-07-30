import * as vscode from 'vscode';
import * as conf from './conf';
import * as workbench from './workbench';


// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {

	const config: vscode.WorkspaceConfiguration = conf.getConfig();

	const pythonPath: string = conf.getPythonPath(config);

	vscode.window.registerTreeDataProvider('workbench', new workbench.WorkBenchProvider());
}

// This method is called when your extension is deactivated
export function deactivate() { }
