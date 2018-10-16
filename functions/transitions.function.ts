let transitionsMap = {};

const singleton = {
    get: (transition) => transitionsMap[transition],
    set: (name, transition) => { transitionsMap = Object.assign({}, transitionsMap, { [name]: transition }); }
}

export function transitions() {
    return singleton;
}