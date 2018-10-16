import { $ } from "./$.function";
import { forEach } from "./for-each.function";
import { getParams } from "./get-params.function";
import { pushStateRoutes } from "./push-state-routes.function";
import { pushStateTransitions } from "./push-state-transitions.function";

let shadowComponentMap = {};

interface ComponentOptionsModel {
    onlyRunIf?: boolean,
    next?: () => any,
    bind?: any,
    children?: string[]
}

export function clearComponent(componentSocketId) {
    delete shadowComponentMap[componentSocketId];
}

export function component(componentSocketId, template: string, options?: ComponentOptionsModel) {
    // If componentSocket exists, and ( either there are no options OR options.onlyRunIf is not explicitly false)
    if ($('#' + componentSocketId)) {
        if (!options || options.onlyRunIf !== false) {
            if (!shadowComponentMap[componentSocketId] || shadowComponentMap[componentSocketId] !== template) {
                // Either there is no prior shadowComponent set OR the template doesn't match the existing shadowComponent
                // So save the new shadowComponent and inject the template into the componentSocket
                shadowComponentMap[componentSocketId] = template;
                // Need to remove the child shadow components (if any)
                if (options.children) {
                    options.children.forEach(child => delete shadowComponentMap[child]);
                }
                run(componentSocketId, template, options);
            }
        }
        if (options && options.next) {
            options.next();
        }
    }
}

function run(componentSocketId, template, options?: any){
    // Attach the template to the innerHTML of the component-socket
    $('#' + componentSocketId).innerHTML = template;
    // Attach pushState routes
    pushStateRoutes(componentSocketId);
    pushStateTransitions(componentSocketId);
    // On (re)render - do the stuff
    if (options && options.bind) {
        const nodeList = document.querySelectorAll(':scope #' + componentSocketId + ' [data-on]');
        forEach(nodeList, node => {
            const funcObj = parseDataOn(node);
            const params = getParams(node);
            Object.keys(funcObj).forEach(key => {
                node.addEventListener(key, (e) => {
                    const paramsWithEvent = Object.assign({}, params, {event: e});
                    options.bind[funcObj[key]](paramsWithEvent);
                }, false);
            })
        })
    }
}

function parseDataOn(el) {
    try {
        return JSON.parse(el.getAttribute('data-on').replace(/\'/g, '"'))
    } catch (e) {
        console.error('data-on ' + el.getAttribute('data-on') + ' is in the incorrect format...');
        console.error('data-on should be in format data-on="{\'event1\': \'bindingMethod1\', \'event2\': \'bindingMethod2\'}"');
    }
}