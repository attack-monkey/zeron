import { debug } from "./debug.function";

let storeStore = [];
let maxLengthStore = 5;

export function store() {
    return {
        get: () => { return JSON.parse(JSON.stringify(storeStore)); } ,
        unshift: newState => { 
            storeStore.unshift(newState);
            if (storeStore.length > maxLengthStore) {
                storeStore.length = maxLengthStore;
            }
            if (debug().isOn()) {
                logStorage();
            }
        },
        maxLength: newMaxLength => maxLengthStore = newMaxLength
    }
}

export function getState(node?) {
    return node ? 
        getStateAtNode(node) :
        JSON.parse(JSON.stringify(storeStore[0]));
}

export function state() {
    return {
        get: (node?) => getState(node),
        set: (newState) => store().unshift(newState)
    }
}

function logStorage() {
    if (debug().getOptions().logFullStore) {
        debug().log('Unshifting new state into Store...');
        debug().log('Store: ', storeStore);
    } else if (debug().getOptions().onlyLogCurrentState) {
        debug().log('Unshifting new state into Store...');
        debug().log('Logging new state...');
        debug().log('State: ', storeStore[0]);
    }
}

function getStateAtNode(node) {
    const nodes = node.split('/');
    return nodes.reduce((ac, cv) => {
        try {
            return ac[cv];
        }
        catch (e) { return undefined; }
    }, getState());
}