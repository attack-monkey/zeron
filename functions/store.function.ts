let storeStore = [];
let maxLengthStore = Infinity;

export function store() {
    return {
        get: () => { return storeStore } ,
        unshift: newState => { 
            storeStore.unshift(newState);
            if (storeStore.length > maxLengthStore) {
                storeStore.length = maxLengthStore;
            } 
        },
        maxLength: newMaxLength => maxLengthStore = newMaxLength
    }
}

export function getState() {
    return storeStore[0];
}

export function state() {
    return {
        get: () => getState(),
        set: (newState) => store().unshift(newState)
    }
}