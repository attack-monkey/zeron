import { route } from "./route.function";

export function onRouteChange(component) {
    // On pop state, re-run the main router
    window.onpopstate = function (event) {
        component();
    }

    // On push state, re-run the main router
    route().onPushState(() => {
        component();
    })

    // Run the router on first pass
    component();
}