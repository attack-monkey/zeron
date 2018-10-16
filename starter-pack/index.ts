import { setState, store, debug, onRouteChange, preLoadComponents, loadComponent } from 'zeron';
import { preload } from './preload-components';

preload();

// Run the app
run();
async function run() {
    debug().on({
        onlyLogCurrentState: true
    });
    store().maxLength(2);
    
    setState({
        todoList: {}
    });

    const viewPortComponent = await loadComponent('viewport-component');
    onRouteChange(viewPortComponent.render);
}