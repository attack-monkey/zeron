interface OptionsModel {
    logFullStore?: boolean;
    onlyLogCurrentState?: boolean;
}

let debuggerx = false;
let optionsStore = {
    logFullStore: true,
    onlyLogCurrentState: false,
};

export function debug() {
    return {
        log: (...args) => debuggerx ? console.log(...args) : undefined,
        on: (options?: OptionsModel) => {
					console.log('Zeron Debugger is On');
                    debuggerx = true
                    optionsStore.logFullStore = islogFullStoreOn(options);
                    optionsStore.onlyLogCurrentState = islogCurrentStateOn(options);
				},
        isOn: () => debuggerx,
        getOptions: () => optionsStore
    }
}

function islogFullStoreOn(options) {
    if (!options) { return; }
    return options.logFullStore || ( !options.onlyLogCurrentState && !options.onlyLogCurrentSubstate );
}

function islogCurrentStateOn(options) {
    if (!options) { return; }
    return options.onlyLogCurrentState;
}