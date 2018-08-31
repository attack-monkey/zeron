let transitionsMap = {};

export function transitions() {
    return {
        get: (transition) => transitionsMap[transition],
        set: (name, transition) => { transitionsMap = Object.assign({}, transitionsMap, { [name]: transition }); }
    }
}