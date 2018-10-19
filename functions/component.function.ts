import { $ } from "./$.function";
import { forEach } from "./for-each.function";
import { getParams } from "./get-params.function";
import { pushStateRoutes } from "./push-state-routes.function";
import { pushStateTransitions } from "./push-state-transitions.function";
import { _escape, loadComponent } from "zeron";

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

export async function component(componentSocketId, template: string, options?: ComponentOptionsModel) {
    // If componentSocket exists, and ( either there are no options OR options.onlyRunIf is not explicitly false)
    if ($('#' + componentSocketId)) {
        let componentChanged = false;
        if (!options || options.onlyRunIf !== false) {
            if (!shadowComponentMap[componentSocketId] || shadowComponentMap[componentSocketId] !== template) {
                // Either there is no prior shadowComponent set OR the template doesn't match the existing shadowComponent
                // So save the new shadowComponent and inject the template into the componentSocket
                componentChanged = true;
                shadowComponentMap[componentSocketId] = template;
                run(componentSocketId, template, options);
            }
        }
        const optionsChildren = !options || !options.children ? undefined : options.children;
        // child components are loaded and rendered
        const childComponents = gatherChildComponentsFromDom(componentSocketId);
        // instances are used to clear shadowComponents
        const childInstances = gatherChildInstancesFromDom(componentSocketId, optionsChildren);
        if (componentChanged && childInstances) {
            // Need to remove the child shadow components (if any) so they all re-render
            childInstances.forEach(child => delete shadowComponentMap[child]);
        }
        await loadChildComponents(childComponents);
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
    bindOns(componentSocketId, options);
    // bindFns() // TODO: this will bind functions to the dom with out events
}

function parseDataOn(el) {
    try {
        return JSON.parse(el.getAttribute('data-on').replace(/\'/g, '"'))
    } catch (e) {
        console.error('data-on ' + el.getAttribute('data-on') + ' is in the incorrect format...');
        console.error('data-on should be in format data-on="{\'event1\': \'bindingMethod1\', \'event2\': \'bindingMethod2\'}"');
    }
}

function bindOns(componentSocketId, options) {
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

function gatherChildInstancesFromDom(componentSocketId, startingChildrenArray: string[]): string[] {
    const ch = startingChildrenArray || [];
    const nodeList = document.querySelectorAll(':scope #' + componentSocketId + ' [data-component]');
        forEach(nodeList, node => {
            const inst = parseDataInstance(node);
            ch.push(inst);
        });
    return ch;
}

function gatherChildComponentsFromDom(componentSocketId): any[] {
    const ch = [];
    const nodeList = document.querySelectorAll(':scope #' + componentSocketId + ' [data-component]');
        forEach(nodeList, node => {
            const comp = parseDataComponent(node);
            const inst =  parseDataInstance(node);
            const params = getParams(node);
            // Only add component if not already in list
            ch.push({
                component: comp,
                instance: inst,
                params: params
            });
        });
    return ch;
}

function parseDataInstance(el) {
    try {
        return el.id;
    } catch (e) {
        console.error('Error extracting id from element with data-component', el);
    }
};

function parseDataComponent(el) {
    try {
        const comp = el.getAttribute('data-component');
        const instId = comp === "true" ? el.id : comp;
        return instId;
    } catch (e) {
        console.error('data-component ' + el.getAttribute('data-component') + ' is in the incorrect format...');
    }
};

async function loadChildComponents(children: any[]) {
    children.forEach(async child => {
        const comp = await loadComponent(child.component);
        const paramsObj = child.params || {};
        const instObj = child.instance ? { instance: child.instance } : {}
        const obj = Object.assign({}, paramsObj, instObj);
        comp.render(obj);
    });
}