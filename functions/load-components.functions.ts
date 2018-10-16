let components;
let loadedComponentMap = {};

export function preLoadComponents(incomingComponents) {
    components = incomingComponents;
}

export async function loadComponent(name: string) {
    if(loadedComponentMap[name]) {
        return loadedComponentMap[name];
    }
    else {
        loadedComponentMap[name] = await components[name];
        return loadedComponentMap[name];
    }
}