let reducersStore;

export function reducers() {
    return {
        get: () => reducersStore,
        set: newReducersStore => { reducersStore = newReducersStore; }
    }
}
    
