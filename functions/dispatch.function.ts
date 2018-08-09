import { reducers } from './reducers.function';
import { debug } from './debug.function';

export function dispatch(state, action) {
    if (debug().isOn()) {
        debug().log('Dispatching...');
        debug().log('Action: ', action);
    }
    return reduce(reducers().get(), state, action);
}

function reduce(reducers, state, action) {
    return Object.keys(reducers).reduce((newState, reducerKey) => {
        return Object.assign(
            {},
            newState,
            {[reducerKey]: reducers[reducerKey](state[reducerKey], action, reducerKey) }
        );
    }, {});
}

    
