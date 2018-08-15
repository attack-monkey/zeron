let debuggerx = false;

export function debug() {
    return {
        log: (...args) => debuggerx ? console.log(...args) : undefined,
        on: () => {
					console.log('Zeron Debugger is On');
					debuggerx = true
				},
        isOn: () => debuggerx
    }
}
