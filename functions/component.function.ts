import { $ } from "zeron/functions/$.function";
import { forEach } from "zeron/functions/for-each.function";
import { getParams } from "zeron/functions/get-params.function";

let shadowComponentMap = {};

interface ComponentOptionsModel {
    onlyRunIf?: boolean,
    onSocketConfirmation?: () => any,
    onRender?: any
}

export function component(componentSocketId, template: string, options?: ComponentOptionsModel) {
    // If componentSocket exists, and ( either there are no options OR options.onlyRunIf is not explicitly false)
    if ($('#' + componentSocketId)) {
        if (!options || options.onlyRunIf !== false) {
            if (!shadowComponentMap[componentSocketId] || shadowComponentMap[componentSocketId] !== template) {
                // Either there is no prior shadowComponent set OR the template doesn't match the existing shadowComponent
                // So save the new shadowComponent and inject the template into the componentSocket
                shadowComponentMap[componentSocketId] = template;
                run($('#' + componentSocketId), template, options);
            }
        }
        if (options && options.onSocketConfirmation) {
            options.onSocketConfirmation();
        }
    }
}

function run(componentSocket, template, options?: any){
    // Attach the template to the innerHTML of the component-socket
    componentSocket.innerHTML = template;
    // On (re)render - do the stuff
    if (options && options.onRender) {
        const nodeList = document.querySelectorAll(':scope #' + componentSocket.id + ' [data-on]');
        forEach(nodeList, node => {
            const funcObj = parseDataOn(node);
            const params = getParams(node);
            Object.keys(funcObj).forEach(key => {
                node.addEventListener(key, () => { 
                    options.onRender[funcObj[key]](params);
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