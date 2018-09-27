import { component } from "./functions/component.function";
import { genId } from "./functions/get-unique-id.function";
import { store, state, getState } from "./functions/store.function";
import { iu } from "./functions/iu.functions";
import { forEach } from "./functions/for-each.function";
import { getInput } from "./functions/get-input.function";
import { _escape } from "./functions/escape.function";
import { route } from "./functions/route.function";
import { pushStateRoutes } from "./functions/push-state-routes.function";
import { urlSegments } from "./functions/url-segments.function";
import { debug } from './functions/debug.function';
import { $ } from "./functions/$.function";
import { on } from "./functions/on.function";
import { onRouteChange } from "./functions/on-route-change.function";
import { engine } from "./functions/engine.function";
import { pushStateTransitions } from "./functions/push-state-transitions.function";
import { transitions } from "./functions/transitions.function";

export const zeron = {
    component: component,
    genId: genId,
    store: store,
    state: state,
    getState: getState,
    iu: iu,
    forEach: forEach,
    getInput: getInput,
    escape: _escape,
    route: route,
    pushStateRoutes: pushStateRoutes,
    pushStateTransitions: pushStateTransitions,
    urlSegments: urlSegments,
    debug: debug,
    $: $,
    on: on,
    onRouteChange: onRouteChange,
    engine: engine,
    transitions: transitions
}

export * from './functions/component.function';
export * from './functions/get-unique-id.function';
export * from './functions/store.function';
export * from './functions/iu.functions';
export * from './functions/for-each.function';
export * from './functions/get-input.function';
export * from './functions/escape.function';
export * from './functions/route.function';
export * from './functions/push-state-routes.function';
export * from './functions/url-segments.function';
export * from './functions/debug.function';
export * from './functions/$.function';
export * from './functions/on.function';
export * from './functions/on-route-change.function';
export * from './functions/engine.function';
export * from './functions/push-state-transitions.function';
export * from './functions/transitions.function';