import matlab.engine

sessionName : str = 'Bench';
engine = matlab.engine.connect_matlab(sessionName);
varList = engine.eval('who')
varDict = {var: engine.eval(var) for var in varList}

print(varDict)