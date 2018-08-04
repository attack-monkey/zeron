interface ComponentOptionsModel {
    onlyRunIf: boolean
}

// The component-socket passed in from index.js is now referenced as componentSocket
export function component(componentSocket, template: string, options?: ComponentOptionsModel) {
    // If componentSocket exists, execute the component's run block
    if(options && options.onlyRunIf === false) {
        if (componentSocket && options.onlyRunIf) {
            run(componentSocket, options);
        }
    } else if (componentSocket) { run(componentSocket, template, options); }
}

function run(componentSocket, template, options?: any){
    // Attach the template to the innerHTML of the component-socket
    componentSocket.innerHTML = template;
}