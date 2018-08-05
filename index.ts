import { component } from "./functions/component.function";
import { dispatch } from "./functions/dispatch.function";
import { genId } from "./functions/getUniqueId.function";
import { store, state, getState } from "./functions/store.function";
import { iu } from "./functions/iu.functions";
import { forEach } from "./functions/for-each.function";
import { getInput } from "./functions/get-input.function";
import { zOn } from "./functions/z-on.function";
import { reducers } from "./functions/reducers.function";
import { _escape } from "./functions/escape.function";
import { pushStateRoutes } from "./functions/push-state-routes.function";
import { route } from "./functions/route.function";
import { urlSegments } from "./functions/url-segments.function";

export const zeron = {
    component: component,
    dispatch: dispatch,
    genId: genId,
    store: store,
    state: state,
    getState: getState,
    iu: iu,
    forEach: forEach,
    getInput: getInput,
    escape: _escape,
    zOn: zOn,
    reducers: reducers,
    route: route,
    pushStateRoutes: pushStateRoutes,
    urlSegments: urlSegments
}