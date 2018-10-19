interface OptionsModel {
    autoLog: 'fullStore' | 'currentState' | false
}

let debuggerx = false;
let optionsStore: OptionsModel = {
    autoLog: false
};

export function debug() {
    return {
        log: (...args) => debuggerx ? console.log(...args) : undefined,
        on: (options?: OptionsModel) => {
					console.log('Debugger is On');
                    debuggerx = true;
                    if (
                        options && 
                        options.autoLog && 
                        ['fullStore', 'currentState', false].some(option => options.autoLog === option)
                    ) {
                        optionsStore.autoLog = options.autoLog;
                    }
                },
        off: () => {
            console.log('Debugger is Off');
            debuggerx = false
        },
        isOn: () => debuggerx,
        getOptions: () => optionsStore
    }
}