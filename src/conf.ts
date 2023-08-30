import * as vscode from 'vscode';
import * as path from 'path';

export function getConfig(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration('matlabworkbench');
}

export function getPythonPath(config : vscode.WorkspaceConfiguration): string {

	let pythonPathSetting: string | undefined = config.get("pythonPath");
	let pythonPath: string = pythonPathSetting
			? path.normalize(pythonPathSetting)
			: "python";	
	return pythonPath;
}