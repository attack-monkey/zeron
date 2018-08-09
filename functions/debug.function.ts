let debuggerx = false;

export function debug() {
    return {
        log: (...args) => console.log(...args),
        on: () => {
					console.log('Zeron Debugger is On');
					debuggerx = true
				},
        isOn: () => debuggerx
    }
}
