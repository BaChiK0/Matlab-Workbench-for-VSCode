import * as vscode from 'vscode';
import * as conf from './conf';
import * as workbench from './workbench';
import * as child_process from 'child_process';
import * as path from 'path';


// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {

	const config: vscode.WorkspaceConfiguration = conf.getConfig();

	const pythonPath: string = conf.getPythonPath(config);

	const WorkBenchProvider: workbench.WorkBenchProvider = new workbench.WorkBenchProvider();

	vscode.window.registerTreeDataProvider('workbench', WorkBenchProvider);

	const scriptDir: string = path.join(context.asAbsolutePath("") ,'/src');

	const scriptPath: string = path.join(scriptDir, 'getWorkbench.py');

	context.subscriptions.push(vscode.commands.registerCommand('MatlabWorkbench.shareSession', () => {
		for (const terminal of vscode.window.terminals) {
			if (terminal.name === 'MATLAB') {
				terminal.sendText("matlab.engine.shareEngine('Bench')");
				return;
			}
		}
		vscode.window.showInformationMessage('There is no running MATLAB terminal.');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('MatlabWorkbench.getMatlabWorkbench', () => {
		for (const terminal of vscode.window.terminals) {
			if (terminal.name === 'MATLAB') {
				const output : string = child_process.execFileSync(pythonPath, [scriptPath], {encoding: 'utf8'});
				const stringlist : string[]= output.trim().slice(1, -1).split(/\s*, \s*/);
				const map : Map<string, string> = new Map();
				for (const string of stringlist) {
					const keyvaluepair : string[] = string.split(/\s*: \s*/);
					map.set(keyvaluepair[0], keyvaluepair[1]);
				}
				WorkBenchProvider.setWorkbenchData(map);
				return;
			}
		}
		vscode.window.showInformationMessage('There is no running MATLAB terminal.');
	}));
}

// This method is called when your extension is deactivated
export function deactivate() { }
