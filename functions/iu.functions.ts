export function iu(state, subArray, val) {
    if (!subArray) { console.log('No target provided'); } else
        if (subArray.length < 1) { console.log('No target provided'); } else
            if (!state) { console.log('No state object provided'); } else {
                if (typeof subArray === 'string') { subArray = subArray.split('/').filter(segment => segment); }
                return reducer(state, subArray, cloner(val), 0);
            }
}

function reducer(_state, subArray, val, l) {
    try {
        const key = subArray[l];
        if (l + 1 === subArray.length) {
            const value = val;
            const replacer =
                val === undefined ||
                    val === null ||
                    typeof val === 'object' && Array.isArray(val) && val.length === 0 ||
                    typeof val === 'object' && !Array.isArray(val) && Object.keys(val).length === 0
                    ? undefined : val;
            return Object.assign({}, _state, { [key]: replacer });
        }
        else {
            const value = _state[key] ? _state[key] : {};
            return Object.assign({}, _state, { [key]: reducer(value, subArray, val, l + 1) });
        }
    } catch (error) { console.log('reducer error =>', error); }
}

function cloner(arg) {
    return JSON.parse(JSON.stringify(arg));
}