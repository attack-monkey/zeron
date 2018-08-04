import { reducers } from './reducers.function';
import { store } from './store.function';

export function dispatch(state, action) {
    return reduce(reducers().get(), state, action);
}

function reduce(reducers, state, action) {
    return Object.keys(reducers).reduce((newState, reducerKey) => {
        return Object.assign(
            {},
            newState,
            {[reducerKey]: reducers[reducerKey](state[reducerKey], action) }
        );
    }, {});
}

    
