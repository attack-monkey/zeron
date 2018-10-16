/*
 * IMMUTABLE UPDATE
 * ================
 * 
 * This immutable object updater leaves the original object in tact and produces a new object.
 * It targets a specific node and creates a new object with the particular node updated to the new value
 * 
 * If the node doesn't already exist, it will be created.
 * If the node is updated to undefined / null / [] / {}, this will delete the node.
 * If the parent node no longer has children it will be left as {}.
 * 
 * The first param is state - AKA the object to update
 * The second param is an array representing which node to target.
 * 
 * eg. ['lvl1', 'lvl2', 'val'] represents state.lvl1.lvl2.val
 * 
 * Note: the second parameter can also be a string delimted by '/'
 * eg. 'lvl1/lvl2/val'
 * 
 * The third param is the value to update the node to
 */

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
            const replacer = isEmpty(val) ? undefined : val;
            return replacer !== undefined ? 
                Object.assign({}, _state, { [key]: replacer }) :
                stateWithoutKey(_state, key)
        } else {
            const value = !isEmpty(_state[key]) ? _state[key] : {};
            return Object.assign({}, _state, { [key]: reducer(value, subArray, val, l + 1) });
        }
    } catch (error) { console.log('reducer error =>', error); }
}

function cloner(arg) {
    try {
        return JSON.parse(JSON.stringify(arg));
    } catch (e) {
        return null;
    }
}

function isEmpty(val) {
    return val === undefined ||
        val === null ||
        typeof val === 'object' && Array.isArray(val) && val.length === 0 ||
        typeof val === 'object' && !Array.isArray(val) && Object.keys(val).length === 0
}

function stateWithoutKey(state, key) {
    const { [key]: value, ...withoutKey } = state;
    return withoutKey;
}